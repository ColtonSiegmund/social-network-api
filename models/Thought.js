const { Schema, model } = require('mongoose');
const User = require('./User');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction'
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
thoughtSchema
  .virtual('getReactions')
  // Getter
  .get(function () {
    return this.tags.length;
  });

// Initialize our Application model
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;