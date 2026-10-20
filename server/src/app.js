import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes will be mounted here in Step 5

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', status: 404 });
});

// Central error handler (4 arguments = Express error middleware)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error', status });
});

export default app;