/**
 * Error Handler Middleware
 *
 * Centralized error handling — per nodebestpractices:
 * "Handle errors centrally, not within a middleware."
 *
 * The Oracle (χρησμός) interprets errors and speaks to the philosopher.
 */

import { Response } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '../logger/logger';

/**
 * Don't leak stack traces in production.
 * Don't leak internal error details to clients.
 */
export function errorHandler(err: Error, res: Response): void {
  // Log all errors with full details (for debugging)
  logger.error('Error occurred', {
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  // AppError — known, operational errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      status: 'error',
    });
    return;
  }

  // Programmer errors — unknown, potentially catastrophic
  // In production: don't leak details
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({
      error: 'An internal error occurred. The oracles are investigating.',
      code: 'INTERNAL_SERVER_ERROR',
      status: 'error',
    });
    return;
  }

  // Development: show full error
  res.status(500).json({
    error: err.message,
    name: err.name,
    stack: err.stack,
    code: 'INTERNAL_SERVER_ERROR',
    status: 'error',
  });
}
