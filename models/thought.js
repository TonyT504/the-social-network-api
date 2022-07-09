const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');
const formatDate = require("../utils/date")
const reactionSchema = new Schema({

  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()

  },
  reactionBody: {
    type: String,
    Required: true,
    max_length: 280
  },
  username: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp),
  },



},
  {
    toJSON: {
      getters: true,
    },
  })
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1
    },
    username: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);
thoughtSchema.virtual("reactioncount").get(function () {
  return this.reactions.length
})
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
