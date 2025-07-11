import app from "./main";
import { logger } from "./utils/logger";


const startServer = async () => {
    app.listen(5000, () => {
        logger.info("Server is running on port 5000");
    });
}

startServer();