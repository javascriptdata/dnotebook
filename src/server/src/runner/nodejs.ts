import repl from 'repl';
import vm from 'vm';
import util from 'util';
import { spawn } from 'child_process';
import { Response } from 'express';
import { transformSync } from "@babel/core";
import { RunNodeCodeOptions } from "../types";
import { generateBashCode } from '../utils';

const ReplKernelManager: any = {}

//A simple repl server to evaluate code from the browser
function getDefaultReplServer() {
    const replServer = repl.start({
        prompt: '',
        eval: replEvalCode,
        ignoreUndefined: true,
        terminal: true,
        useColors: true,
        useGlobal: false
    });

    replServer.context.__dirname = process.cwd();
    replServer.context.require = require;
    replServer.context.spawn = spawn;
    replServer.context.util = util;

    return replServer

}

async function replEvalCode(code: string) {
    /**@ts-ignore */
    return runNodeCode({ code });
}

const runNodeCode = ({ code, res, language, activeNotebookName }: RunNodeCodeOptions) => {
    //switch kernel depending on active notebook
    ReplKernelManager[activeNotebookName] = ReplKernelManager[activeNotebookName] || getDefaultReplServer()

    switch (language) {

        case "sh":
            const bashCode = generateBashCode(code);
            runJsCodeInContext({ code: bashCode, res, activeNotebookName });
            break;
        case "javascript":
            try {
                //Transpile all JS code to ES5 version
                let transformedJsCode = transformSync(code, {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "targets": {
                                    "esmodules": true
                                }
                            }
                        ]
                    ],
                })?.code || code;

                transformedJsCode = `${transformedJsCode}\nconsole.log('')`
                runJsCodeInContext({ code: transformedJsCode, res, activeNotebookName })
                break;
            } catch (err) {
                let errMsg = formatErrorOutput(err)
                res.write(`${errMsg}<br />`);
                res.end();
                break;
            }

            break;
        case "typescript":
            try {
                //Transpile all TS code to ES5 version in child process
                const tsCode = transformSync(code, {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "targets": {
                                    "esmodules": true
                                }
                            }
                        ]
                    ],
                    plugins: [
                        "@babel/plugin-transform-typescript"
                    ]
                })?.code || code;

                runJsCodeInContext({ code: tsCode, res, activeNotebookName })
                break;
            } catch (err) {
                let errMsg = formatErrorOutput(err)
                res.write(`${errMsg}<br />`);
                res.end();
                break;
            }
        case "process":
            handleProcessCmds({ code, res, activeNotebookName });
            break;

        default:
            throw new Error(`Language ${language} is not supported`);
    }
}

const runJsCodeInContext = async ({ code, res, activeNotebookName }: any) => {
    try {
        //Ensures all console.log statements in code are written to the response
        ReplKernelManager[activeNotebookName].console = {
            log: (...args: any[]) => {
                res.write(`${args[0]}<br />`);
            }
        };

        ReplKernelManager[activeNotebookName].res = res;
        
        await vm.runInNewContext(code, ReplKernelManager[activeNotebookName], {
            displayErrors: true,
            microtaskMode: "afterEvaluate"
        })

    } catch (err: any) {
        let errMsg = formatErrorOutput(err)
        res.write(`${errMsg}<br />`);
        res.end();
    }
}

const formatErrorOutput = (err: any) => {
    return JSON.stringify({ output: err.message, name: err.name, __$hasError: true })
}

const handleProcessCmds = async ({ code, res, activeNotebookName }: { code: string, res: Response, activeNotebookName: string }) => {
    switch (code) {
        case "stop":
            stopKernel(res, activeNotebookName);
            break;
        default:
            break;
    }
}

const stopKernel = async (res: Response, activeNotebookName: string) => {
    console.log("Stopping running kernel...")
    ReplKernelManager[activeNotebookName].process.exit();
    res.end("Kernel Stopped Successfully");
}

export {
    runNodeCode,
}