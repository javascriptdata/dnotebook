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

export {
    callbackWriter
}

