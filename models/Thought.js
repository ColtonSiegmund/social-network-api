const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// import formatdate function


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Must have input to create a thought',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getDate => formatDate(getDate)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false,
  }
);


thoughtSchema.virtual('getReactions').get(function () {
    return this.reactions.length;
  });



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;