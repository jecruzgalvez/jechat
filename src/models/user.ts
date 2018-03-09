import * as mongoose from 'mongoose';

// User schema
let userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
});

export const User = mongoose.model('User', userSchema);
