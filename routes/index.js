// 需要用到 express.Router 所以先載入 express
const express = require('express')
const router = express.Router()
// 載入封裝好的路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// use 將 request 導入模組
router.use('/', home)
router.use('/restaurants', restaurants)

// 輸出 router 給主程式
module.exports = router