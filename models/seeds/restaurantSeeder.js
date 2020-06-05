const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantSeedData = require('./restaurantSeed.json')

db.once('open', () => {
  console.log('MongoDB connected!')
  restaurantSeedData.forEach(result => {
    Restaurant.create({
      name: result.name,
      category: result.category,
      image: result.image,
      location: result.location,
      phone: result.phone,
      google_map: result.google_map,
      rating: result.rating,
      description: result.description
    })
  })
  console.log('done')
})