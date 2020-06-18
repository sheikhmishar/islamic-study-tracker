// Student Model
const Student = require('../models/Student')

// Return all students
const allStudents = (req, res) => {
  Student.find((err, data) => {
    if (err) res.json({ message: 'err' })
    // TODO: next(err)
    else if (data) res.json(data)
  })
}

// Return specific student by _id in param
const studentDetails = (req, res) => {
  const { _id } = req.params
  // TODO: does hang while finding deleted id
  Student.findById(_id, (err, data) => {
    if (err) res.json({ message: `Error Finding Student with ID: ${_id}` })
    // Null
    else if (data) res.json(data)
  })
}

// Update student by _id from param
const updateStudent = (req, res) => {
  const { _id } = req.params
  const { body } = req
  Student.findByIdAndUpdate(_id, { $set: body }, { new: true }, (err, data) => {
    if (err) res.json({ message: `Error Updating Student with ID: ${_id}` })
    else res.json({ message: data })
  })
}

// Add student data by _id from param
const addStudentData = (req, res) => {
  const { _id } = req.params
  const data = { data: req.body }
  Student.findByIdAndUpdate(
    _id,
    { $push: data },
    { new: true },
    (err, data) => {
      if (err) res.json({ message: `Error Updating Student with ID: ${_id}` })
      else res.json({ message: data })
    }
  )
}

// Delete student data by _id from param
const deleteStudentData = (req, res) => {
  const { _id } = req.params
  const data = { data: req.body }
  Student.findByIdAndUpdate(
    _id,
    { $pull: data },
    { new: true },
    (err, data) => {
      if (err) res.json({ message: `Error Updating Student with ID: ${_id}` })
      else res.json({ message: data })
    }
  )
}

// Delete student by _id from param
const deleteStudent = (req, res) => {
  const { _id } = req.params

  Student.findByIdAndRemove(_id, (err, data) => {
    if (err) res.json({ message: `Error Deleting Student with ID: ${_id}` })
    else res.json({ message: `Removed Student with ID: ${_id}` })
  })
}

// Instantiate the controller object
const studentController = {
  allStudents,
  studentDetails,
  updateStudent,
  addStudentData,
  deleteStudentData,
  deleteStudent
}

module.exports = studentController
