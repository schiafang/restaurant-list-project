const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
})
module.exports = mongoose.model('Restaurant', restSchema)