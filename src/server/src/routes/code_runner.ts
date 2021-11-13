import express from 'express';
import { runCode } from '../runner'

const codeRunnerRoute = express.Router();

codeRunnerRoute.post('/run', async (req, res) => {
    const { code, language } = req.body;
    const result = await runCode(code, language);
    res.send(result);
})

export default codeRunnerRoute;