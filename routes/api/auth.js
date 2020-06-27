const authRouter = require('express').Router()

const { login, register, authenticate } = require('../../controllers/auth')

// @route   POST api/auth/login
// @desc    Login
// @access  Public
authRouter.post('/login', login)

// @route   POST api/auth/register
// @desc    Register
// @access  Public
authRouter.post('/register', register) // TODO: redirect to POST ../students/

// @route   POST api/auth/auth
// @desc    Auth
// @access  Public
authRouter.post('/auth', authenticate)

module.exports = authRouter
