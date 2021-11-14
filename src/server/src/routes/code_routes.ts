import express, { Response } from 'express';
import { runNodeCode } from '../runner/nodejs'

const codeRoute = express.Router();

codeRoute.post('/nodejs/run', async (req, res) => {
    const { code, jsFlavor } = req.body;
    res.setHeader('Content-Type', 'text/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    await runNodeCode(code, jsFlavor, callbackWriter.bind(null, res));
})

const callbackWriter = (res: Response, intermediateResult: any) => {
    if (typeof intermediateResult === 'object' && intermediateResult !== null) {
        res.write(JSON.stringify(intermediateResult) + '\n');
    }else{
        const fResult = intermediateResult === undefined ?  "\n" : JSON.stringify(intermediateResult)  + '\n';
        res.write(fResult);
    }
};

export default codeRoute;