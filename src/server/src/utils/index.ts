import { Response } from "express";

/**
 * A callback function that is called with intermediate results as the
 * code VM executes each code and returns a value.
 * This function writes in streaming mode to the response.
 * @param res Express response object
 * @param intermediateResult Intermediate result(s) sent from code execution
 */
const callbackWriter = (res: Response, intermediateResult: any) => {
    res.write(intermediateResult);
};

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
    callbackWriter,
    formatAndReturnOutput,
    generateBashCode
}

