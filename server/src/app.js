import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';   

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);                   

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', status: 404 });
});

// Central error handler (4 arguments = Express error middleware)
app.use((err, req, res, next) => {                  
  let status = err.status || 500;
  let message = err.message || 'Server error';

  if (err.name === 'ValidationError') {          // Mongoose validation
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  } else if (err.name === 'CastError') {         // bad ObjectId
    status = 400;
    message = 'Invalid ID';
  } else if (err.code === 11000) {               // duplicate key
    status = 409;
    message = 'Duplicate value';
  }

  if (status === 500) console.error(err);        // log only real server errors
  res.status(status).json({ message, status });
});

export default app;