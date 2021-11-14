import express, { Response } from 'express';
import { runNodeCode } from '../runner/nodejs'

const codeRoute = express.Router();

codeRoute.post('/nodejs/run', async (req, res) => {
    const { code, jsFlavor } = req.body;
    res.setHeader('Content-Type', 'text/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    runNodeCode(code, jsFlavor, callbackWriter.bind(null, res));
})

const callbackWriter = (res: Response, intermediateResult: any) => {
    if (intermediateResult) {
        res.write(JSON.stringify({ output: intermediateResult}));
    } else {
        res.end();
    }
};
export default codeRoute;