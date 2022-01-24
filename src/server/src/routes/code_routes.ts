import express from 'express';
import { callbackWriter } from '../utils';
import { runNodeCode } from '../runner/nodejs'

const codeRoute = express.Router();

codeRoute.post('/nodejs/run', async (req, res) => {
    const { code, language } = req.body;
    res.setHeader('Content-Type', 'text/json; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    await runNodeCode({ code, language, callback: callbackWriter.bind(null, res) });
})


export default codeRoute;