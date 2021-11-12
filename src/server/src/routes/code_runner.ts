import express from 'express';
import { runCode } from '../runner'

const codeRunnerRoute = express.Router();

codeRunnerRoute.post('/run', (req, res) => {
    const { code, language } = req.body;
    const result = runCode(code, language);
    res.send({
        output: result,
    });
})

export default codeRunnerRoute;