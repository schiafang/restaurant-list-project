const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
// const methodOverride = require('method-override')
// router.use(methodOverride('_method'))

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
  Restaurant.find()
    .lean()
    .sort({ [by]: [order] })
    .then(restaurant => {
      res.render('index', { restaurant })
    })
    .catch(error => console.log(error))
})

router.get('/edit', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'desc' })
    .then(restaurant => res.render('indexedit', { restaurant }))
    .catch(error => console.eroor(error))
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
  return Restaurant.findById(id)
    .then(restaurant => {
      // Object.assign(target, source)
      restaurant = Object.assign(restaurant, req.body)
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