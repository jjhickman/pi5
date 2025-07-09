import { WebSocketServer } from 'ws';
import { createLogger, transports, format, combine, json, timestamp, colorize } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, json } = format;

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'pi5-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const logger = createLogger({
  format: combine(timestamp(), json(), colorize()),
  transports: [fileRotateTransport],
});
const wss = new WebSocketServer({ port: Number(process.env.LOGGER_PORT) });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    let message;
        try {
            message = JSON.parse(data);
            if (message.hasOwnProperty('topic') && message.hasOwnProperty('message')) {
                  switch(message.topic) {
                    case 'info':
                      logger.info(message.message);
                      break;
                    case 'warn':
                      logger.warn(message.message);
                      break;
                    case 'error':
                      logger.error(message.message);
                      break;
                    default:
                      logger.debug(message.message);
                  };
            }
        } catch (e) {
            logger.error(e);
        }
  });
});

['SIGINT', 'SIGTERM', 'SIGQUIT']
  .forEach(signal => process.on(signal, () => {
    logger.end();
    wss.close();
    process.exit(-1);
  }));