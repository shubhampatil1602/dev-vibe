import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/constants.js';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Enter a strong password.');
        }
      },
    },
    age: {
      type: Number,
      min: 12,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: `{VALUE} is incorrect gender type`,
      },
      // validate(value) {
      //   if (value !== 'male' && value !== 'female' && value !== 'others') {
      //     throw new Error('Invalid gender');
      //   }
      // },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Invalid photo url');
        }
      },
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwxEuOgrydWFyurdUW5UNRhk6tShevfV2ZJQ&s',
    },
    about: {
      type: String,
      default: 'Software Engineer',
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

// generate jwt token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, emailId: this.emailId }, JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};

// compare clientPassword for login/signin
userSchema.methods.validatePassword = async function (clientPassword) {
  const { password } = this;
  const isPasswordValid = await bcrypt.compare(clientPassword, password);
  return isPasswordValid;
};

export const User = mongoose.model('User', userSchema);
