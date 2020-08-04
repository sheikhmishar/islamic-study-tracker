const mongoose = require('mongoose')
const { join } = require('path')

const setupEnv = () => {
  if (typeof process.env.NODE_ENV === 'undefined')
    process.env.NODE_ENV = 'development'

  const { NODE_ENV } = process.env
  if (NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    if (NODE_ENV === 'production.local') dotenv.config()
    else if (NODE_ENV === 'development')
      dotenv.config({ path: join(__dirname, '.env.development'), debug: true })
  }
}

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}
const mongoInit = () =>
  mongoose.connect(process.env.MONGO_URL, dbOptions, err =>
    console.log(
      err ? `MongoDB Error: ${err}` : 'MongoDB Connected Successfully',
      new Date().toISOString()
    )
  ) // TODO: implement retry

const mongoDestroy = () =>
  mongoose.disconnect(err =>
    console.log(
      err ? 'MongoDB Error Exiting' : 'MongoDB Safe Exit',
      new Date().toISOString()
    )
  )

module.exports = { mongoInit, mongoDestroy, setupEnv }
