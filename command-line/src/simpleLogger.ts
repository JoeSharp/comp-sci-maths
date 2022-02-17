import * as winston from "winston";

const simpleLogger = winston.createLogger({
    level: "info",
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

export default simpleLogger;