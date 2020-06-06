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
      console.log('登入失敗')
      return res.redirect('/users/login')
    }
    req.logIn(user, err => {
      if (err) return next(err)
      console.log('登入成功')
      return res.redirect('/')
    })
  })(req, res, next)
})

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  const errors = []
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼必須相同。' })
    res.render('register', { errors, username, email })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'Email 已被註冊' })
        res.render('register', { username, email, errors })
      } else {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => {
            User.create({ username, email, password: hash })
            req.flash('successMsg', `${email} 已成功註冊`)
          })
          .then(() => res.redirect('/users/login'))
      }
    })
    .catch(err => console.log(err))
})

// router.post('/register', (req, res) => {
//   const { username, email, password, confirmPassword } = req.body
//   // 檢查表單是否填寫正確
//   const errors = []
//   if (password !== confirmPassword) {
//     errors.push({ message: '密碼與確認密碼必須相同。' })
//   }
//   // 只要 error 有內容就代表有錯誤，render錯誤訊息
//   if (errors.length) {
//     return res.render('register', {
//       errors, username, email, password
//     })
//   }
//   // 檢查使用者是否已經註冊，未註冊則新增使用者資料
//   User.findOne({ email }).then(user => {
//     if (user) {
//       errors.push({ message: '使用者已經存在。' })
//       res.render('register', { username, email, errors })
//     } else {
//       //return User.create({ name, email, password })
//       // 改為加入 bycrypt，讓 password = hash 值
//       return bcrypt
//         .genSalt(10)
//         .then(salt => bcrypt.hash(password, salt))
//         .then(hash => User.create({ username, email, password: hash }))
//         .then(() => res.redirect('/'))
//         .catch(err => console.log(err))
//     }
//   })
// })

module.exports = router