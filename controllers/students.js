// Student Model
const Student = require('../models/Student')
const { CREATED, INTERNAL_ERROR, OK, NOT_FOUND } = require('./STATUS_CODES')

// Return all students
const allStudents = (req, res) => {
  Student.find()
    .lean()
    .exec()
    .then(doc => res.status(OK).json(doc))
    .catch(() =>
      res.status(INTERNAL_ERROR).json({ message: 'Error finding students' })
    )
}

// Return specific student by _id in param
const studentDetails = (req, res) => {
  const { _id } = req.params
  // TODO: fix hang while finding deleted id
  Student.findById(_id, (err, doc) => {
    if (err || !doc)
      res
        .status(err ? INTERNAL_ERROR : NOT_FOUND)
        .json({ message: `Error Finding Student with ID: ${_id}` })
    else res.status(OK).json(doc)
  })
}

// Update student by _id from param
const updateStudent = (req, res) => {
  const { _id } = req.params
  const { body } = req
  Student.findByIdAndUpdate(_id, { $set: body }, { new: true }, (err, doc) => {
    if (err || !doc)
      res
        .status(err ? INTERNAL_ERROR : NOT_FOUND)
        .json({ message: `Error Updating Student with ID: ${_id}` })
    else res.status(OK).json(doc)
  })
}

// Add student data by _id from param
const getStudentData = (req, res) => {
  const { _id } = req.params
  Student.findById(_id, 'data', (err, doc) => {
    if (err || !doc)
      res
        .status(err ? INTERNAL_ERROR : NOT_FOUND)
        .json({ message: `Error Getting Student data with ID: ${_id}` })
    else res.status(OK).json(doc.data)
  })
}

// Add student data by _id from param
const addStudentData = (req, res) => {
  const { _id } = req.params
  const data = { data: req.body }
  Student.findByIdAndUpdate(_id, { $push: data }, { new: true }, (err, doc) => {
    if (err)
      res
        .status(INTERNAL_ERROR)
        .json({ message: `Error Updating Student with ID: ${_id}` })
    else res.status(CREATED).json(doc.data)
  })
}

// Update student data by _id from param
const updateStudentData = (req, res) => {
  const _id = req.params._id
  const data = req.body
  Student.findOneAndUpdate(
    { _id: _id, data: { $elemMatch: { _id: data._id } } },
    {
      $set: {
        'data.$': data
      }
    },
    { new: true },
    (err, doc) => {
      if (err || !doc)
        res
          .status(err ? INTERNAL_ERROR : NOT_FOUND)
          .json({ message: `Error Updating Student with ID: ${_id}` })
      else
        res.status(OK).json(doc.data.find(d => d._id.toString() === data._id))
    }
  )
}

// Delete student data by _id from param
const deleteStudentData = (req, res) => {
  const { _id } = req.params
  const data = { data: req.body }
  Student.findByIdAndUpdate(_id, { $pull: data }, { new: true }, (err, doc) => {
    if (err)
      res
        .status(INTERNAL_ERROR)
        .json({ message: `Error Updating Student with ID: ${_id}` })
    else res.status(OK).json(doc.data)
  })
}

// Delete student by _id from param
const deleteStudent = (req, res) => {
  const { _id } = req.params

  Student.findByIdAndRemove(_id, (err, doc) => {
    if (err)
      res
        .status(INTERNAL_ERROR)
        .json({ message: `Error Deleting Student with ID: ${_id}` })
    else res.status(OK).json({ message: `Removed Student with ID: ${_id}` })
  })
}

// Update whole Student collection from raw body query
const updateStudentsRaw = (req, res) => {
  const { body } = req
  Student.deleteMany({}, err => {
    if (err)
      return res.status(INTERNAL_ERROR).json({ message: `Error bulk deleting` })
    Student.insertMany(body, { ordered: true }, (err, doc) => {
      if (err)
        res.status(INTERNAL_ERROR).json({ message: `Error bulk inserting` })
      else res.status(OK).json(doc)
    })
  })
}

// Instantiate the controller object
const studentController = {
  allStudents,
  studentDetails,
  updateStudent,
  deleteStudent,
  getStudentData,
  addStudentData,
  updateStudentData,
  deleteStudentData,
  updateStudentsRaw
}

module.exports = studentController
