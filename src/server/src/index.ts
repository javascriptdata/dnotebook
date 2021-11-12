import express from 'express';
import cors from 'cors';
import ENV_CONFIG from './config/env'
import codeRunnerRoute from './routes/code_runner'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/code', codeRunnerRoute);

app.get('/', (req, res) => {
    res.send('Well done!');
})

const PORT = ENV_CONFIG.SERVER.PORT;

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
})