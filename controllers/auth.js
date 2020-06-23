// Student Model
const Student = require('../models/Student')
const { CREATED, INTERNAL_ERROR, OK, NOT_FOUND } = require('./STATUS_CODES')

// Logins and returns student data
const login = (req, res) => {
  const { username, password } = req.body
  Student.find({ username, password }, (err, data) => {
    if (err) res.status(INTERNAL_ERROR).json({ message: 'Error Login' })
    else if (data && data.length > 0) res.status(OK).json(data)
    else res.status(NOT_FOUND).json(data)
  })
}

// Logins and returns student data
const register = (req, res) => {
  const newStudent = new Student({
    username: req.body.username,
    password: req.body.password,
    data: req.body.data
  })

  newStudent.save((err, data) => {
    if (err)
      res
        .status(INTERNAL_ERROR)
        .json({ message: `Error Adding Student: ${newStudent}` })
    else res.status(CREATED).json(data)
  }) // TODO: distinct username check
}

const authenticate = (req, res) => {}

// Instantiate the controller object
const authController = {
  login,
  register,
  authenticate
}

module.exports = authController
