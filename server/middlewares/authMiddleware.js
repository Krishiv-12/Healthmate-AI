import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user from DB and attach to req
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    req.user = user; // ✅ fix: now req.user._id will be available
    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
};

export { authMiddleware, roleMiddleware };
