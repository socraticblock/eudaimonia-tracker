/**
 * Logger — Winston-based structured logging
 *
 * The Scribe (γραμματεύς) records all that transpires in the Stoa.
 * Structured logging with trace IDs for observability.
 */

import winston from 'winston';

const { combine, timestamp, json, errors, colorize } = winston.format;

// Custom format for development
const devFormat = combine(
  errors({ stack: true }),
  colorize({ all: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(info => {
    const {
      level,
      message,
      timestamp: ts,
      stack,
      ...meta
    } = info as {
      level: string;
      message: string;
      timestamp: string;
      stack?: string;
      [key: string]: unknown;
    };
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${ts} [${level}]: ${message} ${metaStr} ${stack ?? ''}`;
  })
);

// Production format is JSON for machine parsing
const prodFormat = combine(
  errors({ stack: true }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  json()
);

const isProduction = process.env.NODE_ENV === 'production';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: isProduction ? prodFormat : devFormat,
  defaultMeta: {
    service: 'eudaimonia',
    version: process.env.npm_package_version ?? '0.1.0',
  },
  transports: [new winston.transports.Console()],
  // Don't exit on uncaught exceptions — let the process manager handle it
  exitOnError: false,
});

export default logger;
