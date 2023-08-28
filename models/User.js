// requiring mongoose for our schema, model, and types so we can use them for id's, creating models, etc... and requiring moment so we can format the date
const { Schema, model } = require('mongoose');

// our user Model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      
    },
    email: {
      type: String,
      unique: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,'must match an e-mail address'],
      required: true,
    
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// creating a virtual to get our friends list
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// creating our model for export
const User = model('User', userSchema);

// exporting our model
module.exports = User;
