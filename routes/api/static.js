const express = require('express')
const staticRouter = express.Router()
const { static } = express
const { join } = require('path')

if (process.env.NODE_ENV === 'production')
  staticRouter.get('/', (req, res) =>
    res.status(200).json({ message: 'server alive' })
  )
else {
  const rootPath = join(__dirname, '..', '..', 'views', 'build')
  staticRouter.use('/', static(rootPath))
  const indexPath = join(rootPath, 'index.html')
  staticRouter.get('/*', (req, res) => res.sendFile(indexPath))
}

module.exports = staticRouter
