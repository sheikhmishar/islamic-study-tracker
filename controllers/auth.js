// Student Model
const Student = require('../models/Student')

// Logins and returns student data
const login = (req, res) => {
  const { username, password } = req.body
  Student.find({ username, password }, (err, data) => {
    if (err) res.json({ message: 'Error Login' })
    else if (data) res.json(data)
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
    if (err) res.json({ message: `Error Adding Student: ${newStudent}` })
    else res.json({ message: data })
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
