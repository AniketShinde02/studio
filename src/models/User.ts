
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email.',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password.'],
    minlength: 6,
    select: false, // Keep password hidden by default
  },
  emailVerified: Date,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
