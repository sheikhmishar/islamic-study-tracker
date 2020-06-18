const mongoose = require('mongoose'),
  MONGO_URL = 'mongodb://127.0.0.1:27017/', // /?gssapiServiceName=mongodb
  dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  initDB = () => {
    mongoose.connect(MONGO_URL, dbOptions, err => {
      console.log(err ? err : 'Connected Successfully')
    })
  }

module.exports = { mongoInit: initDB }
