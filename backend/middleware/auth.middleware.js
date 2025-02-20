import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        message: 'Unauthorised - No Access Token Provided',
        error: error.message,
      });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User Not Found' });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ message: 'UnAuthorised - Access token expired' });
      }
      throw error;
    }
  } catch (error) {
    console.log('Error on protectRoute middleware', error.message);
    return res.status(401).json({
      message: 'Unauthorised - Invalid  Access Token',
      error: error.message,
    });
  }
};
