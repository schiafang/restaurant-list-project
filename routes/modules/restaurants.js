const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// ----- Read (render) -----//
router.get('/create', (req, res) => {
  res.render('create')
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find(
    {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword } }
      ]
    }
  )
    .lean()
    .then(restaurant => {
      if (restaurant.length === 0) { res.render('notfound') }
      else { res.render('index', { restaurant }) }
    })
})

router.get('/sort/:by/:order', (req, res) => {
  const by = req.params.by
  const order = req.params.order
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ [by]: [order] })
    .then(restaurant => {
      res.render('index', { restaurant })
    })
    .catch(error => console.log(error))
})

router.get('/edit', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'desc' })
    .then(restaurant => res.render('indexedit', { restaurant }))
    .catch(error => console.eroor(error))
})

router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.find({ _id, userId })
    .lean()
    .then(restaurant => {
      restaurant = restaurant[0] //????
      res.render('detail', { restaurant })
    })
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => { res.render('edit', restaurant) })
    .catch(error => console.log(error))
})

// ----- Create (create) ----- //
router.post('/', (req, res) => {
  if (req.body.image.length === 0) { req.body.image = '/images/not_found.png' }
  if (req.body.category === '選擇餐廳類型') { req.body.category = '未分類' }
  const userId = { userId: req.user._id }
  const restaurant = Object.assign(req.body, userId)
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// ----- Upadte (save) ----- //
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// ----- Delete (remove) ----- //
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router