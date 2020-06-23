const mongoose = require('mongoose')
const dotenv = require('dotenv')

const setupEnv = () => {
  if (typeof process.env.NODE_ENV === 'undefined')
    process.env.NODE_ENV = 'development'

  const { NODE_ENV } = process.env
  if (NODE_ENV === 'production.local') dotenv.config()
  else if (NODE_ENV === 'development')
    dotenv.config({ path: './.env.development', debug: true })
}

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}
const mongoInit = () =>
  mongoose.connect(process.env.MONGO_URL, dbOptions, err =>
    console.log(
      err ? `MongoDB Error: ${err}` : 'MongoDB Connected Successfully'
    )
  )

module.exports = { mongoInit, setupEnv }
