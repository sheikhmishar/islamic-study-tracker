// Course Model
const Course = require('../models/Course')

// Return all courses
const allCourses = (req, res) => {
  Course.find((err, doc) => {
    if (err) res.json({ message: 'Error Finding Courses' })
    else res.json(doc)
  })
}

// Return specific course by _id in param
const courseDetails = (req, res) => {
  const { _id } = req.params
  Course.findById(_id, (err, doc) => {
    if (err) res.json({ message: `Error Finding Course with ID: ${_id}` })
    else res.json(doc)
  })
}

// Add course by _id from param
const addCourse = (req, res) => {
  const newCourse = new Course({
    courseName: req.body.courseName,
    courseContents: req.body.courseContents
  })
  newCourse.save((err, doc) => {
    if (err) res.json({ message: `Error Adding Course: ${newCourse}` })
    else res.json(doc)
  }) // TODO: distinct course check
}

// Update course by _id from param
const updateCourse = (req, res) => {
  const { _id } = req.params
  const { body } = req
  Course.findByIdAndUpdate(_id, { $set: body }, { new: true }, (err, doc) => {
    if (err) res.json({ message: `Error Updating Course with ID: ${_id}` })
    else res.json(doc)
  })
}

// Delete course by _id from param
const deleteCourse = (req, res) => {
  const { _id } = req.params
  Course.findByIdAndRemove(_id, (err, doc) => {
    if (err) res.json({ message: `Error Deleting Course with ID: ${_id}` })
    else res.json({ message: `Removed Course with ID: ${_id}` })
  })
}

// Instantiate the controller object
const coursesController = {
  allCourses,
  courseDetails,
  addCourse,
  updateCourse,
  deleteCourse
}

module.exports = coursesController
