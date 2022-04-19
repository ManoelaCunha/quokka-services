import express from 'express';
import routes from './routes';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
routes(app);

export default app;
