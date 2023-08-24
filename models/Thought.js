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
      default: Date.now(getDate),
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
      getters: true
    },
    id: false,
  }
);


thoughtSchema
  .virtual('getReactions')
  // Getter
  .get(function () {
    return this.reaction.length;
  });

  const reactionSchema = new Schema(
    {
      reactionId: {
        ObjectId
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now(getDate),
      }
    }
  )


const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;