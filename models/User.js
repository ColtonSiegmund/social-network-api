const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid e-mail address!`
      },
      required: [true, 'User e-mail required']
    
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts'
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Application model
const User = model('user', userSchema);

module.exports = User;
