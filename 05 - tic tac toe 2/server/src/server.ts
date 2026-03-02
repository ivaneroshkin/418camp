import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import routes from './routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: config.cors.origin,
  })
);

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.use(express.json({ limit: '10kb' }));

app.use(routes);

app.use(errorHandler);

export default app;
