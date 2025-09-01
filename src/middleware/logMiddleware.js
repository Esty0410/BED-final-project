import logger from '../utils/log.js';

const log = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const ms = Date.now() - start;
        logger.info(`${req.method}, ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms.`);
    });

    next();
};

export default log;