import express from 'express';
import { runNodeCode } from '../runner/nodejs';

const codeRoute = express.Router();


codeRoute.post('/nodejs/run', async (req, res) => {
    const { content, language, activeNotebookName } = req.body;
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-control": "no-cache"
    });
    runNodeCode({ code: content, language, res, activeNotebookName });
})


export default codeRoute;