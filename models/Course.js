const mongoose = require('mongoose'),
  { Schema, model } = mongoose

const CourseContentsSchema = new Schema({
  contentType: {
    type: String,
    required: true,
    enum: ['youtube', 'article'],
    default: 'youtube'
  },
  contentId: {
    type: String,
    required: true
  }
})

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    max: 50
  },
  courseContents: [CourseContentsSchema]
})

module.exports = model('Course', CourseSchema)
