import * as mongoose from 'mongoose';
// import { ObjectId, ObjectID } from 'bson';

// let friendSchema = new mongoose.Schema({
//   friendsEmail: {
//     type: String,
//     required: true
//   },
//   friendsName: {
//     type: String,
//     required: true
//   }
// });

// User schema
let Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
        
let userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [{ type: ObjectId, ref: 'User' }]
});

export const User = mongoose.model('User', userSchema);
