const studentsRouter = require('express').Router()
const {
  allStudents,
  studentDetails,
  updateStudent,
  deleteStudent,
  getStudentData,
  addStudentData,
  updateStudentData,
  deleteStudentData
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

// @route   DELETE api/students/:id
// @desc    Delete students by id
// @access  Public
studentsRouter.delete('/:_id', deleteStudent)

// @route   GET api/students/:id/data
// @desc    Add student data by id
// @access  Public
studentsRouter.get('/:_id/data', getStudentData)

// @route   POST api/students/:id/data
// @desc    Add student data by id
// @access  Public
studentsRouter.post('/:_id/data', addStudentData)

// @route   PUT api/students/:id/data
// @desc    Update student data by id
// @access  Public
studentsRouter.put('/:_id/data', updateStudentData)

// @route   DELETE api/students/:id/data
// @desc    Delete student data by id
// @access  Public
studentsRouter.delete('/:_id/data', deleteStudentData)

module.exports = studentsRouter
