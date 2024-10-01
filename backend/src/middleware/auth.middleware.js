import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import { User } from '../models/user.model.js';

export const userAuth = async (req, res, next) => {
  try {
    // read the token from req.cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error('Token invalid or not found');
    }

    // decode the jwt token and verify
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // find the user
    const { _id } = decodedToken;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('authMiddleware err ---', error);
    res.status(401).json({ message: error.message });
  }
};
