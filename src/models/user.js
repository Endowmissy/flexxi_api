const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your full name'],
      lowercase: true,
      maxLength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      lowercase: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
      trim: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// return JSON response
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // password and tokens array will not be in response
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Sign JWT
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const _id = user._id.toString();
  const payload = {
      sub: _id,
      issuedAt: Date.now()
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

// Compare password
UserSchema.methods.validatePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password)
}

// Generate and hash password token for reset password
UserSchema.methods.getResetPasswordToken = function() {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  // Set expire 
  this.resetPasswordExpire = Date.now() + (10 * 60 * 1000)

  return resetToken
}

module.exports = mongoose.model('User', UserSchema);
