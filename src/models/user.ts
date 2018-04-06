import * as mongoose from 'mongoose';

export const ROLE_MEMBER = 'Member';
export const ROLE_CLIENT = 'Client';
export const ROLE_OWNER = 'Owner';
export const ROLE_ADMIN = 'Admin';

// User schema
let Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
        
let userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {    
    type: String,
  },
  role: {
    type: String,
    enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
    default: ROLE_MEMBER
  },
  stripe: {
    customerId: { type: String },
    subscriptionId: { type: String },
    lastFour: { type: String },
    plan: { type: String },
    activeUntil: { type: Date }
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },  
  friends: [{ type: ObjectId, ref: 'User' }],
},
{
  timestamps: true
});

export const User = mongoose.model('User', userSchema);
