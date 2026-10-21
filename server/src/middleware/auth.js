import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { HttpError } from '../utils/httpError.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError(401, 'Not authorized, no token');
  }

  let decoded;
  try {
    decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
  } catch {
    throw new HttpError(401, 'Not authorized, invalid or expired token');
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new HttpError(401, 'User no longer exists');

  req.user = user;
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new HttpError(403, 'Admin access required');
  }
  next();
};