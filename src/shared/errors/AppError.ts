/**
 * AppError — Custom error class for Eudaimonia
 *
 * Distinguishes operational errors (expected) from programmer errors (catastrophic).
 * Per nodebestpractices: "Distinguish catastrophic errors from operational errors."
 */

/**
 * Operational errors — known cases, can be handled gracefully.
 * Examples: invalid input, not found, unauthorized.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// ---- Common Operational Errors ----

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access. Present your credentials.') {
    super(message, 401, 'UNAUTHORIZED');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden. You do not have permission for this action.') {
    super(message, 403, 'FORBIDDEN');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found. It may have been lost to the ages.`, 404, 'NOT_FOUND');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests. Rest, philosopher, and try again.') {
    super(message, 429, 'TOO_MANY_REQUESTS');
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'An internal error occurred. The oracles are investigating.') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
