import * as mongoose from 'mongoose';

let Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

let MessageSchema = new Schema({
  conversationId: {
    type: ObjectId,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

export const Message = mongoose.model('Message', MessageSchema);
