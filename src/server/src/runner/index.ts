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

//Track and keep console logs present in code to a global variable
//This is because console.log in code will not be returned by vm.runInNewContext
// as it is automatically written to stdout
var __$$logs: any[] = [];
replServer.context.console = {
    log: (...args: any[]) => {
        __$$logs.push(...args);
    }
};

async function replEvalCode(code: string) {
    return runCode(code);
}

const runCode = async (code: string, language?: string) => {
    try {
        // Code may come in any flavor of JS, so we need to convert it to pre-ES5
        const regeneratedCode = transformSync(code, {
            presets: ['@babel/preset-env'],
        })?.code || code;

        const result = await vm.runInNewContext(regeneratedCode, replServer.context, {
            displayErrors: true,
        });
        //output of some babel transformations will return "use strict" as final result
        // hence we check and return empty string if it is there
        const output = formattedDisplayedOutput(result, __$$logs);
        __$$logs = [];
        return { output, hasErrors: false };
    } catch (err: any) {
        return { output: err.message, stack: err.stack, name: err.name, hasErrors: true };
    }
}

const formattedDisplayedOutput = (output: string, logs: string[]) => {
    if (output && output !== '') {
        return output === "use strict" ? "" : output
    } else {
        return logs.length ? logs.join('\n') : '';
    }
}

export {
    runCode
}