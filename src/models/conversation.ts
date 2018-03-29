import * as mongoose from 'mongoose';

let Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

// Schema defines how chat messages will be stored in MongoDB
let ConversationSchema = new Schema({  
  participants: [{ type: ObjectId, ref: 'User'}],
});

export const Conversation = mongoose.model('Conversation', ConversationSchema);  
