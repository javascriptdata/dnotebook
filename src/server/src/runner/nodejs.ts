import repl from 'repl';
import vm from 'vm';
import { transformSync } from "@babel/core";
const util = require('util');
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
    return runNodeCode(code);
}

const runNodeCode = async (code: string, language?: string, callback?: (intermediateResult: any) => void) => {

    try {
        let wrappedCode;

        if (language === "bash") {
            wrappedCode = generateBashCode(code)
        } else {
            // Code may come in any flavor of JS, so we need to convert it to pre-ES5
            const regeneratedCode = transformSync(code, {
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
            //wrap generated code in async function
            wrappedCode = `(async () => {${regeneratedCode}})()`;
        }


        //Write console logs to call back. This ensures that general console.logs or console.logs in loops
        // are sent to the client.
        replServer.context.console = {
            log: (...args: any[]) => {
                let argsString = args[0]
                if (argsString === Object(argsString)){
                    argsString = JSON.stringify(args[0])
                }
                formatAndReturnOutput(argsString, callback);
            }
        };

        const result = await vm.runInNewContext(wrappedCode, replServer.context, {
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

const formatAndReturnOutput = (output: any, callback: any) => {
    //output of some babel transformations will return "use strict" as final result, hence we check and return empty string if it is there.
    //I also append an HTML break to the result. This is necessary to avoid the browser from buffering the output.
    const foutput = output == "use strict" ? "" : output + "<br />";
    callback(foutput);
}

const generateBashCode = (code: string) => {
    return `
    exec('${code}')
        .then(({ stdout, stderr }) => {
            console.log(stdout)
            console.log(stderr)
        })
        .catch((err) => {
            console.log(err)
        })
    `
}

export {
    runNodeCode
}