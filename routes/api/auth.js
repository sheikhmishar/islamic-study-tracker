const authRouter = require('express').Router()

const { login, register, authenticate } = require('../../controllers/auth')

// @route   POST api/auth
// @desc    Login
// @access  Public
authRouter.post('/login', login)

// @route   POST api/auth
// @desc    Register
// @access  Public
authRouter.post('/register', register) // TODO: redirect to POST ../students/

// @route   POST api/auth
// @desc    Auth
// @access  Public
authRouter.post('/', authenticate)

module.exports = authRouter
