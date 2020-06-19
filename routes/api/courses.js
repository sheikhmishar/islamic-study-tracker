const coursesRouter = require('express').Router()
const {
  allCourses,
  courseDetails,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../../controllers/courses')

// @route   GET api/courses
// @desc    Get all courses
// @access  Public
coursesRouter.get('/', allCourses)

// @route   POST api/courses/:id
// @desc    Add new courses
// @access  Public
coursesRouter.post('/', addCourse)

// @route   GET api/courses/:id
// @desc    Get courses by id
// @access  Public
coursesRouter.get('/:_id', courseDetails)


// @route   PUT api/courses/:id
// @desc    Update courses by id
// @access  Public
coursesRouter.put('/:_id', updateCourse)

// @route   DELETE api/courses/:id
// @desc    Delete courses by id
// @access  Public
coursesRouter.delete('/:_id', deleteCourse)

module.exports = coursesRouter
