const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection
const restaurantList = require('./restaurant.json').results
const Restaurant = require('./models/restaurant')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use((bodyParser.urlencoded({ extended: true })))

app.listen(port, () => console.log(`The server listening on localhost:${port}`))

// 連接啟動資料庫
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error!'))
db.once('open', () => console.log('MongoDB connected!'))

// --------路由設定-------- //
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.filter(item => {
    return item.category.includes(keyword) ||
      item.name.toLowerCase().includes(keyword.toLowerCase())
  })
  if (restaurants.length === 0) {
    res.render('notfound')
  } else {
    res.render('index', { restaurant: restaurants, keyword })
  }
})

// 載入資料庫資料到首頁樣板中
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.eroor(error))
})
// 渲染 show 頁面
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

// create page and post new restaurant
app.get('/create', (req, res) => res.render('create'))

app.post('/create/new', (req, res) => {
  if (req.body.image.length === 0) { req.body.image = 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png' }
  if (req.body.category === '選擇餐廳類型') { req.body.category = '未分類' }
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit page to update and edit restaurant
app.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', restaurant))
    .catch(error => console.log(error))
})

app.post('/:id/edit/update', (req, res) => {
  const id = req.params.id
  // const body = req.body
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

// delete
app.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    // .then(restaurant => {
    //   if (window.confirm('確定要刪除嗎')) { restaurant.remove() }
    //   else { return }
    // })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})