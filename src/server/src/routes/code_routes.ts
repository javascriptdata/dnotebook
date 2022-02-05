import express from 'express';
import { runNodeCode } from '../runner/nodejs';

const codeRoute = express.Router();



codeRoute.post('/nodejs/run', async (req, res) => {
    const { code, language } = req.body;
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-control": "no-cache"
    });
    runNodeCode({ code, language, res });
})


export default codeRoute;