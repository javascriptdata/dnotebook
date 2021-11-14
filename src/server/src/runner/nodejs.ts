import repl from 'repl';
import vm from 'vm';
import { transformSync } from "@babel/core";

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

async function replEvalCode(code: string) {
    return runNodeCode(code);
}

const runNodeCode = (code: string, jsFlavor?: string, callback?: (intermediateResult: any) => void) => {
    try {
        // Code may come in any flavor of JS, so we need to convert it to pre-ES5
        const regeneratedCode = transformSync(code, {
            presets: ['@babel/preset-env'],
        })?.code || code;

        //Write console logs to call back. This ensures that general console.logs or console.logs in loops
        // are sent to the client.
        replServer.context.console = {
            log: (...args: any[]) => {
                formatAndReturnOutput(args[0], callback);
            }
        };

        const result = vm.runInNewContext(regeneratedCode, replServer.context, {
            displayErrors: true,
        })

        formatAndReturnOutput(result, callback);
    } catch (err: any) {
        callback && callback({ output: err.message, name: err.name, hasErrors: true });
    }
}

const formatAndReturnOutput = (output: string, callback: any) => {
    if (output) {
        //output of some babel transformations will return "use strict" as final result
        // hence we check and return empty string if it is there
        const foutput = output == "use strict" ? "" : output
        callback(foutput);
    } else {
        callback(output);
    }
}

export {
    runNodeCode
}