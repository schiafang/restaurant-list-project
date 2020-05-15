const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// ----- Read (render) -----//
router.get('/create', (req, res) => {
  res.render('create')
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  return Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword } }
    ]
  })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => {
      if (restaurant.length === 0) { res.render('notfound') }
      else { res.render('index', { restaurant }) }
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', restaurant) }
    )
    .catch(error => console.log(error))
})

// ----- Create (create) ----- //
router.post('/', (req, res) => {
  if (req.body.image.length === 0) { req.body.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  if (req.body.category === '選擇餐廳類型') { req.body.category = '未分類' }
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// ----- Upadte (save) ----- //
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, category, image, location, phone, rating, google_map, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// ----- Delete (remove) ----- //
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router