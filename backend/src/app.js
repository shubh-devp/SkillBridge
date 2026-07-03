const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');

const env = require('./config/env');
const logger = require('./utils/logger');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const { AppError } = require('./utils/errors');
const { apiLimiter } = require('./middleware/rateLimiter');
const routes = require('./routes');

const app = express();

let isDBConnected = false;

const initializeDB = async () => {
  try {
    const mongoose = require('mongoose');
    await mongoose.connect(env.mongodbUri, { serverSelectionTimeoutMS: 5000 });
    isDBConnected = true;
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  } catch (error) {
    isDBConnected = false;
    logger.warn('MongoDB not available. Running without database connection. Error: ' + error.message);
    logger.warn('Only routes that do not require DB will work.');
  }
};

initializeDB();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(compression());
app.use(morgan(env.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLimiter);

app.use('/uploads', express.static(path.resolve(__dirname, '..', env.uploadDir)));

const frontendDist = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'EduServe API Documentation',
}));

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'EduServe API is running',
    environment: env.nodeEnv,
    dbConnected: isDBConnected,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/v1', routes);

app.all('/api/*', (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

app.use(errorHandler);

process.on('uncaughtException', (error) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', error);
  process.exit(1);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => logger.info('Process terminated'));
});

const server = app.listen(env.port, () => {
  logger.info(`EduServe API server running on port ${env.port} in ${env.nodeEnv} mode`);
  logger.info(`API Documentation: http://localhost:${env.port}/api-docs`);
  logger.info(`Health Check: http://localhost:${env.port}/api/health`);
});

module.exports = app;
