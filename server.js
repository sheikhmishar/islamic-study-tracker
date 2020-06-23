const { mongoInit, setupEnv } = require('./config')
// Setup environment variables
setupEnv()

// Importing Path and Express.js modules
const express = require('express')
const app = express()

// Global middlewares
const cors = require('cors')({
  credentials: true,
  origin: true,
  maxAge: 60 * 60
})
// @ts-ignore
app.use(cors)
app.use(express.json()) // for parsing json from client
app.use(express.urlencoded({ extended: true })) // for parsing url encoded data from client

// Intialize database
mongoInit()

// Routes
app.use('/api/students', require('./routes/api/students'))
app.use('/api/courses', require('./routes/api/courses'))
app.use('/api/auth', require('./routes/api/auth'))

// Create server
const expressPORT = process.env.PORT || 5000
app.listen(expressPORT, () =>
  console.log(`Server started on port ${expressPORT}`)
)
