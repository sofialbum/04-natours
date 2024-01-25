const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowecase: true,
    validate: [validator.isEmail, 'Plase provide a valid email'],
    trim: true
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'The password should be at least 8 chars long'],
    trim: true
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a passwordConfirm'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  }
});

// eslint-disable-next-line node/no-unsupported-features/es-syntax
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
