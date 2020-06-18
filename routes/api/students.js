const studentsRouter = require('express').Router()
const {
  allStudents,
  studentDetails,
  updateStudent,
  addStudentData,
  deleteStudentData,
  deleteStudent
} = require('../../controllers/students')

// @route   GET api/students
// @desc    Get all students
// @access  Public
studentsRouter.get('/', allStudents)

// @route   GET api/students/:id
// @desc    Get students by id
// @access  Public
studentsRouter.get('/:_id', studentDetails)

// @route   PUT api/students/:id
// @desc    Update students by id
// @access  Public
studentsRouter.put('/:_id', updateStudent)

// @route   PUT api/students/:id/add
// @desc    Add student data by id
// @access  Public
studentsRouter.put('/:_id/data', addStudentData)

// @route   DELETE api/students/:id/add
// @desc    Delete student data by id
// @access  Public
studentsRouter.delete('/:_id/data', deleteStudentData)

// @route   DELETE api/students/:id
// @desc    Delete students by id
// @access  Public
studentsRouter.delete('/:_id', deleteStudent)

module.exports = studentsRouter
