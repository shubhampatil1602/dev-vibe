import validator from 'validator';

export const validateSignupData = (req) => {
  const { firstName, emailId, password } = req.body;

  if (!firstName || !emailId || !password) {
    throw new Error('All fields are required');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Invalid email');
  }
};

export const validateProfileData = (req) => {
  const allowedEditFields = [
    'firstName',
    'lastName',
    'photoUrl',
    'gender',
    'age',
    'about',
    'skills',
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

export const validateForgetPassword = (req) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error('All fields are required');
  } else if (oldPassword === newPassword) {
    throw new Error('New password cannot be same as old password');
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error('Password is not strong enough');
  }
};
