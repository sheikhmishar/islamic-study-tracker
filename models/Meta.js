const mongoose = require('mongoose'),
  { Schema, model } = mongoose

const MetaSchema = new Schema({
  revision: {
    type: Number,
    default: 1
  }
})

module.exports = model('Meta', MetaSchema)
