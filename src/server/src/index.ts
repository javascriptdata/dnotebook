import express from 'express';
import cors from 'cors';
import ENV_CONFIG from './config/env'
import codeRoute from './routes/code_routes'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/code', codeRoute);

app.get('/', (req, res) => {
    res.send('Well done!');
})

const PORT = ENV_CONFIG.SERVER.PORT;

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
})