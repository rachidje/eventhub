import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { jsonApiResponseMiddleware } from './middlewares/json-response.middleware';
import { ApiRoutes } from './routes';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}))


app.use(jsonApiResponseMiddleware)
app.use('/api', ApiRoutes);

app.use(errorHandlerMiddleware)
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

export default app;