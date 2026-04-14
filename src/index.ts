/**
 * Eudaimonia — The Stoic Habit Tracker
 *
 * Entry point: The Stoa (stoa / στοά) — the colonnade where Zeno taught.
 * This is where philosophers gather to practice (askēsis / ἄσκησις).
 */

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './shared/logger/logger';
import { errorHandler } from './shared/middleware/errorHandler';

// Load environment
dotenv.config();

const app: Application = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);

// ---- Security Middleware ----
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? '*',
    credentials: true,
  })
);

// ---- Body Parsing ----
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ---- Request Logging ----
app.use((req: Request, _res: Response, next: NextFunction) => {
  logger.info('Incoming request', {
    traceId: (req.headers['x-request-id'] as string) ?? 'no-trace-id',
    method: req.method,
    path: req.path,
    ip: req.ip,
  });
  next();
});

// ---- Health Checks ----
// The Oracle (health) — is the philosopher alive?
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    app: 'Eudaimonia',
    version: process.env.npm_package_version ?? '0.1.0',
    timestamp: new Date().toISOString(),
  });
});

// The Oracle (ready) — is the philosopher ready to serve?
app.get('/ready', (_req: Request, res: Response) => {
  // TODO: Add DB connection check
  res.json({
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
});

// ---- Routes ----
// The Stoa (stoa / στοά) — main dashboard routes
// For now, placeholder routes until Phase 5
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Eudaimonia (Εὐδαιμονία)',
    description: 'An Ancient Greek habit tracker for philosophers seeking flourishing.',
    version: '0.1.0',
    docs: '/api/docs',
  });
});

// ---- Error Handling ----
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  errorHandler(err, res);
});

// ---- 404 Handler ----
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The path you seek does not exist in this realm.',
  });
});

// ---- Graceful Shutdown ----
const server = app.listen(PORT, () => {
  logger.info(`Eudaimonia is illuminated at port ${PORT}`);
  logger.info('The Stoa is open. Philosophers welcome.');
});

const gracefulShutdown = (signal: string): void => {
  logger.info(`${signal} received. The Stoa closes its doors gracefully.`);
  server.close(() => {
    logger.info('HTTP server closed.');
    // TODO: Close DB connections
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
