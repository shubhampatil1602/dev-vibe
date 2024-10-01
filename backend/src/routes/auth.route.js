import express from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/user.model.js';
import { validateSignupData } from '../utils/validation.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // validate data
    validateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // save user to db
    await user.save();
    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.log('signup err ---', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error('User not found.');
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // generate a jwt token
      const token = user.generateAuthToken();
      res
        .cookie('token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .json({ token, message: 'Login successful' });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.log('login err ---', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  res
    .cookie('token', null, {
      expires: new Date(Date.now()),
    })
    .json({
      message: 'Logout successful',
    });
});

export default router;
