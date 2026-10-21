import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import { HttpError } from '../utils/httpError.js';

const toUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    throw new HttpError(409, 'Email already registered');
  }

  const user = await User.create({ name, email, password });
  res.status(201).json({ user: toUserResponse(user), token: generateToken(user._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    // Same message for both cases, so attackers can't tell which emails exist
    throw new HttpError(401, 'Invalid email or password');
  }

  res.json({ user: toUserResponse(user), token: generateToken(user._id) });
};

export const getMe = (req, res) => {
  res.json({ user: toUserResponse(req.user) });
};