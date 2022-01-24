import repl from 'repl';
import vm from 'vm';
import { transformSync } from "@babel/core";
import { formatAndReturnOutput, generateBashCode } from '../utils';
import CONFIG from '../config/env';
import util from 'util';
const exec = util.promisify(require('child_process').exec);

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
replServer.context.exec = exec;
replServer.context.util = util;


async function replEvalCode(code: string) {
    return runNodeCode({ code });
}

type RunNodeCodeOptions = {
    code: string,
    language?: string,
    callback?: (intermediateResult: any) => void
}


const runNodeCode = async ({ code, language, callback }: RunNodeCodeOptions) => {
    switch (language) {

        case "bash" || "sh" || "powershell":
            const bashCode = generateBashCode(code);
            runJsCodeInContext({ code: bashCode, callback });
            break;

        case "javascript":
            const transformedJsCode = transformSync(code, {
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
            runJsCodeInContext({ code: `${transformedJsCode}\nconsole.log('')`, callback })

            break;

        case "process":
            handleProcessCmds(code, callback);
            break;

        default:
            throw new Error(`Language ${language} is not supported`);
    }



}

const runJsCodeInContext = async ({ code, callback }: RunNodeCodeOptions) => {
    try {

        //Write console logs to call back. This ensures that general console.logs or console.logs in loops
        // are sent to the client.
        replServer.context.console = {
            log: (...args: any[]) => {
                let argsString = args[0]
                if (argsString === Object(argsString)) {
                    argsString = JSON.stringify(args[0])
                }
                formatAndReturnOutput(argsString, callback);
            }
        };

        const result = await vm.runInNewContext(code, replServer.context, {
            displayErrors: true,
        })

        if (result) {
            formatAndReturnOutput(result, callback); //This signifies that the code has finished executing
        }
    } catch (err: any) {
        // console.log(err)
        let errMsg = JSON.stringify({ output: err.message, name: err.name, __$hasError: true })
        callback && callback(errMsg);
    }
}

const handleProcessCmds = async (code: string, callback: any) => {
    switch (code) {
        case "stop":
            stopServer(callback);
            break;
        default:
            break;
    }
}

const stopServer = async (callback: any) => {
    console.log("Stopping running cell")
    replServer.context.process.exit();
    callback("STOPPED CELL SUCCESSFULLY!");

}

export {
    runNodeCode,
}