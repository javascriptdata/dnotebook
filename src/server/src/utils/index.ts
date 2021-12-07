import { Response } from "express";

/**
 * A callback function that is called with intermediate results as the
 * code VM executes each code and returns a value.
 * This function writes in streaming mode to the response.
 * @param res Express response object
 * @param intermediateResult Intermediate result(s) sent from code execution
 */
const callbackWriter = (res: Response, intermediateResult: any) => {
    const fResult = formatOutputBeforeSending(intermediateResult);
    res.write(fResult);
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