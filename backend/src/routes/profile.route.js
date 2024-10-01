import express from 'express';

import { userAuth } from '../middleware/auth.middleware.js';
import { User } from '../models/user.model.js';
import {
  validateForgetPassword,
  validateProfileData,
} from '../utils/validation.js';

const router = express.Router();

router.get('/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    console.log('profile view err ---', error);
    res.status(500).json({ message: error.message });
  }
});

router.patch('/edit', userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error('Invalid edit request');
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `Profile updated success ${loggedInUser.firstName}!`,
      data: loggedInUser,
    });
  } catch (error) {
    console.log('profile edit err ---', error);
    res.status(500).json({ message: error.message });
  }
});

router.patch('/forget-password', userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    validateForgetPassword(req);
    const user = req.user;

    const isOldPassword = await user.validatePassword(oldPassword);
    if (!isOldPassword) {
      throw new Error('Wrong old password!');
    }

    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.log('forget password err ---', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
