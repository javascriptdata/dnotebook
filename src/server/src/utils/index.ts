import { Response } from "express";

/**
 * A callback function that is called with intermediate results as the
 * code VM executes each code and returns a value.
 * This function writes in streaming mode to the response.
 * @param res Express response object
 * @param intermediateResult Intermediate result(s) sent from code execution
 */
const callbackWriter = (res: Response, intermediateResult: any) => {
    if (typeof intermediateResult === 'object' && intermediateResult !== null) {
        if (intermediateResult.hasOwnProperty('duration')) {
            const finalResult = formatOutputBeforeSending(intermediateResult.result)
            if (finalResult === "") {
                res.end(JSON.stringify({
                    data: null,
                    executionIsComplete: true,
                    duration: intermediateResult.duration
                }));
            } else {
                res.write(JSON.stringify({
                    data: finalResult,
                    executionIsComplete: true,
                    duration: intermediateResult.duration
                }));
                res.end();
            }

        } else {
            const fResult = formatOutputBeforeSending(intermediateResult);
            res.write(JSON.stringify({
                data: fResult,
                executionIsComplete: false,
                duration: intermediateResult.duration
            }));
        }
    } else {
        const fResult = formatOutputBeforeSending(intermediateResult);
        res.write(JSON.stringify({
            data: fResult,
            executionIsComplete: false,
            duration: intermediateResult.duration
        }));
    }
};

/**
 * Formats the intermediate result before sending it to the client.
 * The main format here is the check for undefined values. This is important because
 * the response writer cannot write undefined values to the output stream.
 * @param value Any value
 * @returns 
 */
const formatOutputBeforeSending = (value: any) => {
    const fResult = value === undefined ? "" : JSON.stringify(value) + '\n';
    return fResult;
}

export {
    callbackWriter,
    formatOutputBeforeSending
}