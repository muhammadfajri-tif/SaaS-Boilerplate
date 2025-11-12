import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';
import { postsRouter } from './routes/posts';
import { tagsRouter } from './routes/tags';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// Clerk middleware
app.use(clerkMiddleware());

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'];
app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/tags', tagsRouter);

// 404 handler
app.use((_, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      code: 'ROUTE_NOT_FOUND',
      statusCode: 404,
    },
  });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  // console.log(`🚀 Server is running on port ${PORT}`);
  // console.log(`📖 Health check: http://localhost:${PORT}/health`);
  // console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
