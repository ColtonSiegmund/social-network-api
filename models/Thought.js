const { Schema, model, Types } = require('mongoose');
// const reactionSchema = require('./Reaction');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
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
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  }
);

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
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
  }
);



thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// thoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
//   });

//   thoughtSchema.set('toJSON', { virtuals: true });



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;