import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { createContainer } from './config/dependency-injection';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { jsonApiResponseMiddleware } from './middlewares/json-response.middleware';
import { createApiRoutes } from './routes';
import { logger } from './utils/logger';

const app = express();
const container = createContainer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
    stream: {
        write: (message:string) => logger.info(message.trim())
    }
}))


app.use(jsonApiResponseMiddleware)
app.use('/', createApiRoutes(container));

app.use(errorHandlerMiddleware);

app.listen(5000, () => {
    logger.info('✅ Backend Started');
});

export default app;