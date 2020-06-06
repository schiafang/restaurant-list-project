const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'desc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.eroor(error))
})

module.exports = router