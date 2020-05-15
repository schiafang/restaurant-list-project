const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use((bodyParser.urlencoded({ extended: true })))
app.listen(port, () => console.log(`The server listening on localhost:${port}`))

// ----- Read (render) -----//
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.eroor(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

app.get('/create', (req, res) => res.render('create'))

app.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', restaurant) }
    )
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
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

// ----- Create (create) ----- //
app.post('/create/new', (req, res) => {
  if (req.body.image.length === 0) { req.body.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  if (req.body.category === '選擇餐廳類型') { req.body.category = '未分類' }
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// ----- Upadte (save) ----- //
app.post('/:id/edit/update', (req, res) => {
  const id = req.params.id
  const { name, category, image, location, phone, rating, google_map, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.loction = location
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
app.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})