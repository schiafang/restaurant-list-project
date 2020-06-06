const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantSeedData = require('./restaurantSeed.json')
const bcrypt = require('bcryptjs')

const SEED_USER = [
  { email: 'user1@example.com', password: '12345678' },
  { email: 'user2@example.com', password: '12345678' }
]

db.once('open', () => {
  const promise = []
  for (let i = 0; i < SEED_USER.length; i++) {
    promise.push(
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash => User.create({ email: SEED_USER[i].email, password: hash }))
        .then(() => console.log('user seed run done!'))
    )
  }
  Promise.all(promise)
    .then(() => {
      return User.findOne({ email: SEED_USER[0].email })
    })
    .then(user => {
      const _id = user._id
      for (let i = 0; i < 3; i++) {
        Restaurant.create({
          name: restaurantSeedData[i].name,
          category: restaurantSeedData[i].category,
          image: restaurantSeedData[i].image,
          location: restaurantSeedData[i].location,
          phone: restaurantSeedData[i].phone,
          google_map: restaurantSeedData[i].google_map,
          rating: restaurantSeedData[i].rating,
          description: restaurantSeedData[i].description,
          userId: _id
        })
      }
    })
    .then(() => {
      return User.findOne({ email: SEED_USER[1].email })
    })
    .then(user => {
      const _id = user._id
      for (let i = 3; i < 6; i++) {
        Restaurant.create({
          name: restaurantSeedData[i].name,
          category: restaurantSeedData[i].category,
          image: restaurantSeedData[i].image,
          location: restaurantSeedData[i].location,
          phone: restaurantSeedData[i].phone,
          google_map: restaurantSeedData[i].google_map,
          rating: restaurantSeedData[i].rating,
          description: restaurantSeedData[i].description,
          userId: _id
        })
      }
    })
})