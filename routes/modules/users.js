const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

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
  // 在 routes 的 handler 中使用 passport.authenticate
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user) {
      console.log('登入失敗')
      return res.redirect('/users/login')
    }
    req.logIn(user, err => {
      if (err) return next(err)
      console.log('登入成功')
      // console.log(req.session)
      return res.redirect('/')
    })
  })(req, res, next)
})

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('此 Email 已被註冊')
        res.render('register', { username, email })
      } else if (password !== confirmPassword) {
        console.log('密碼與確認密碼必須相同')
        res.render('register', { username, email })
      } else {
        console.log(`${email}註冊成功`)
        return User.create({ username, email, password })
      }
    })
    .then(() => res.redirect('/users/login'))
    .catch(err => console.log(err))
})
module.exports = router