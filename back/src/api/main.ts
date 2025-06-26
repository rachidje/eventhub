import express from 'express';
import cors from 'cors';
import { ApiRoutes } from './routes';
import { jsonApiResponseMiddleware } from './middlewares/json-response.middleware';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(jsonApiResponseMiddleware)
app.use('/api', ApiRoutes);

app.use(errorHandlerMiddleware)
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

export default app;