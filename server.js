const { mongoInit, setupEnv } = require('./config')
// Setup environment variables
setupEnv()

// Importing Path and Express.js modules
const express = require('express')
const app = express()

// Global middlewares
const { json, urlencoded } = express
const cors = require('cors')({
  credentials: true,
  origin: true,
  maxAge: 60 * 60
})
// @ts-ignore
app.use(cors)
app.use(json()) // for parsing json from client
app.use(urlencoded({ extended: true })) // for parsing url encoded data from client

// Intialize database
mongoInit()

// Routes
const studentsRoute = require('./routes/api/students')
const coursesRoute = require('./routes/api/courses')
const authRoute = require('./routes/api/auth')
const staticRoute = require('./routes/api/static')
app.use('/api/students', studentsRoute)
app.use('/api/courses', coursesRoute)
app.use('/api/auth', authRoute)
app.use('/', staticRoute)

// Create server
const { PORT } = process.env
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
