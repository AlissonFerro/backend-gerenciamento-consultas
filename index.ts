import express from 'express';
const app = express();
import cors from 'cors';
import agendamentoRouter from './routes/agendamento';
import authRouter from './routes/auth';
import recepcionistRouter from './routes/recepcionist';
import handleError from './middleware/errorHandle';

app.use(cors({
    origin: '*'
}));
 
require('./startup/db')();
app
    .use(express.json())
    .use('/api/auth', authRouter)
    .use('/api/agendamento', agendamentoRouter)
    .use('/api/recepcionists', recepcionistRouter)
    .use(handleError as any)

const port = 8000;
 
const server = app.listen(port, () => console.log(`Listening on port ${port}`));