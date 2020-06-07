const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/users/login'
// }))

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      req.flash('warningMsg', '登入失敗，請檢查帳號密碼是否正確')
      return res.redirect('/users/login')
    }
    req.logIn(user, err => {
      if (err) return next(err)
      return res.redirect('/')
    })
  })(req, res, next)
})

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  const errors = []
  if (errors.length) res.render('register', { errors, username, email, password })

  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼必須相同' })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '使用者已經存在' })
        res.render('register', { username, email, errors })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => {
            req.flash('successMsg', '已成功註冊，請先登入')
            return User.create({ username, email, password: hash })
          })
          .then(() => res.redirect('/users/login'))
          .catch(err => console.log(err))
      }
    })
})

module.exports = router