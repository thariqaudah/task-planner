const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxLength: 100,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  done: {
    type: Boolean,
    default: false,
  },
  tags: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
