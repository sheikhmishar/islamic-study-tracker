const mongoose = require('mongoose'),
  { Schema, model } = mongoose

const StudentDataSchema = new Schema({
  contentId: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  videoEndPosition: {
    type: Number,
    required: true,
    default: 0
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  }
})

const StudentSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 20
  },
  password: {
    type: String,
    required: true,
    max: 20
  },
  data: {
    type: [StudentDataSchema],
    required: true
  }
})

module.exports = model('Student', StudentSchema)

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
////////////////////////////// mockup ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
const { ObjectId } = Schema.Types
const contentProgressSchema = new Schema({
  contentInfo: {
    type: ObjectId,
    ref: 'CourseContents',
    required: true
  },
  startedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastPosition: {
    type: Number,
    required: true,
    default: 0
  },
  isFinished: {
    type: Boolean,
    required: true,
    default: false
  }
})

const StudentSchema_ = new Schema({
  username: {
    type: String,
    required: true,
    max: 20
  },
  password: {
    type: String,
    required: true,
    max: 20
  },
  data: {
    enrolled_courses: [
      {
        courseInfo: {
          type: ObjectId,
          ref: 'Course',
          required: true
        },
        courseProgress: [contentProgressSchema]
      }
    ]
  }
})
