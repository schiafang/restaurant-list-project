const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantSeedData = require('./restaurantSeed.json')
const bcrypt = require('bcryptjs')

const SEED_USER = [
  { email: 'user1@example.com', password: '12345678' },
  { email: 'user2@example.com', password: '12345678' }
]

// db.once('open', () => {
//   const promise = []

//   for (let i = 0; i < SEED_USER.length; i++) {
//     User.find({ email: SEED_USER[i].email })
//       .then(user => {
//         if (user.length !== 0) {
//           console.log(`使用者${SEED_USER[i].email} 已被註冊`)
//           return
//         }
//         promise.push(
//           bcrypt
//             .genSalt(10)
//             .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
//             .then(hash => User.create({ email: SEED_USER[i].email, password: hash }))
//             .then(() => console.log(`使用者${SEED_USER[i].email} 已建立`))
//             .then(() => User.findOne({ email: SEED_USER[i].email }))
//             .then(user => {
//               const _id = user._id
//               if (user.email === SEED_USER[0].email) {
//                 for (let j = 0; j < 3; j++) {
//                   Restaurant.create({
//                     name: restaurantSeedData[j].name,
//                     category: restaurantSeedData[j].category,
//                     image: restaurantSeedData[j].image,
//                     location: restaurantSeedData[j].location,
//                     phone: restaurantSeedData[j].phone,
//                     google_map: restaurantSeedData[j].google_map,
//                     rating: restaurantSeedData[j].rating,
//                     description: restaurantSeedData[j].description,
//                     userId: _id
//                   })
//                 }
//               }
//               if (user.email === SEED_USER[1].email) {
//                 for (let h = 3; h < 6; h++) {
//                   Restaurant.create({
//                     name: restaurantSeedData[h].name,
//                     category: restaurantSeedData[h].category,
//                     image: restaurantSeedData[h].image,
//                     location: restaurantSeedData[h].location,
//                     phone: restaurantSeedData[h].phone,
//                     google_map: restaurantSeedData[h].google_map,
//                     rating: restaurantSeedData[h].rating,
//                     description: restaurantSeedData[h].description,
//                     userId: _id
//                   })
//                 }
//               }
//               console.log(`${SEED_USER[i].email} 餐廳資料已建立`)
//             })
//         )
//         Promise.all(promise).then(() => {
//           console.log('done')
//           process.exit()
//         })
//       })
//   }
// })

db.once('open', () => {
  const createUserPromises = []

  for (let i = 0; i < SEED_USER.length; i++) {
    createUserPromises.push(
      User.find({ email: SEED_USER[i].email })
        .then(user => {
          if (user.length !== 0) {
            console.log(`使用者${SEED_USER[i].email} 已被註冊`)
            return
          }
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
            .then(hash => User.create({ email: SEED_USER[i].email, password: hash }))
            .then(() => console.log(`使用者${SEED_USER[i].email} 已建立`))
        })
    )
  }

  console.log(createUserPromises) // [ Promise { <pending> }, Promise { <pending> } ]

  Promise.all(createUserPromises).then(() => {
    console.log(createUserPromises) // [ Promise { undefined }, Promise { undefined } ]
    User.findOne({ email: SEED_USER[0].email })
      .then(user => {
        console.log(user) //null
      })
      .catch(error => console.log('error'))
  })
})