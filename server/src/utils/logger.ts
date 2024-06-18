import winston, { createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export type LogMessage = string;
export type LogContext = object;

export enum LogLevels {
  ERROR = "error",
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  HTTP = "http",
}

const { combine, timestamp, printf, colorize } = format;

export class Logger {
  private _logger: winston.Logger;

  constructor() {
    const logColors = {
      error: "red",
      debug: "white",
      info: "green",
      warn: "yellow",
      http: "magenta",
    };

    winston.addColors(logColors);
    this._logger = this.init();
  }

  private init(): winston.Logger {
    const logFormat = printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        meta ? JSON.stringify(meta) : ""
      }`;
    });

    return createLogger({
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        logFormat
      ),
      transports: [
        new winston.transports.Console({
          format: combine(timestamp(), colorize({ all: true })),
        }),
        new DailyRotateFile({
          filename: "logs/debug-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          level: "debug",
        }),
        new DailyRotateFile({
          filename: "logs/application-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          level: "info",
        }),
        new DailyRotateFile({
          filename: "logs/error-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          level: "error",
        }),
        new DailyRotateFile({
          filename: "logs/http-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d",
          level: "http",
        }),
      ],

      exitOnError: false,
    });
  }

  public log(level: LogLevels, message: string, meta?: any) {
    this._logger.log(level, message, meta);
  }

  public error(message: string, meta?: any) {
    this.log(LogLevels.ERROR, message, meta);
  }

  public info(message: string, meta?: any) {
    this.log(LogLevels.INFO, message, meta);
  }

  public debug(message: string, meta?: any) {
    this.log(LogLevels.DEBUG, message, meta);
  }

  public warn(message: string, meta?: any) {
    this.log(LogLevels.WARN, message, meta);
  }

  public http(message: string, meta?: any) {
    this.log(LogLevels.HTTP, message, meta);
  }
}

export const logger = new Logger();
