// requiring mongoose for our schema, model, and types so we can use them for id's, creating models, etc... and requiring moment so we can format the date
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// our reaction schema that we will reference in thought
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
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false,
  }
);

// our thought model
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

// creating a virtual to get the length of the reaction array
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})


// creating our model for export
const Thought = model('Thought', thoughtSchema);

// exporting our model
module.exports = Thought;