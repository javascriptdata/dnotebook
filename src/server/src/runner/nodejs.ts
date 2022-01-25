import repl from 'repl';
import vm from 'vm';
import util from 'util';
import { spawn } from 'child_process';
import { Response } from 'express';
import { transformSync } from "@babel/core";
import { RunNodeCodeOptions } from "../types";
import { generateBashCode } from '../utils';

//A simple repl server to evaluate code from the browser
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

async function replEvalCode(code: string) {
    /**@ts-ignore */
    return runNodeCode({ code });
}

const runNodeCode = ({ code, res, language }: RunNodeCodeOptions) => {
    switch (language) {

        case "sh":
            const bashCode = generateBashCode(code);
            runJsCodeInContext({ code: bashCode, res });
            break;
        case "javascript":
            try {
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
                runJsCodeInContext({ code: transformedJsCode, res })

            } catch (err) {
                let errMsg = formatErrorOutput(err)
                res.write(`${errMsg}<br />`);
                res.end();
            }

            break;

        case "process":
            handleProcessCmds(code, res);
            break;

        default:
            throw new Error(`Language ${language} is not supported`);
    }
}

const runJsCodeInContext = async ({ code, res }: any) => {
    try {
        //Ensures all console.log statements in code are written to the response
        replServer.context.console = {
            log: (...args: any[]) => {
                res.write(`${args[0]}<br />`);
            }
        };

        replServer.context.res = res;

        await vm.runInNewContext(code, replServer.context, {
            displayErrors: true,
        })

    } catch (err: any) {
        console.log(err)
        let errMsg = formatErrorOutput(err)
        res.write(`${errMsg}<br />`);
        res.end();
    }
}

const formatErrorOutput = (err: any) => {
    return JSON.stringify({ output: err.message, name: err.name, __$hasError: true })
}

const handleProcessCmds = async (code: string, res: Response) => {
    switch (code) {
        case "stop":
            stopKernel(res);
            break;
        default:
            break;
    }
}

const stopKernel = async (res: Response) => {
    console.log("Stopping running kernel...")
    replServer.context.process.exit();
    res.write("STOPPED");
}

export {
    runNodeCode,
}