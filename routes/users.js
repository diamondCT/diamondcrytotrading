const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const Invest = require('../models/Invest');
const Withdraw = require('../models/Withdraw');

router.get('/i', (req, res) => {
  console.log('reahing')
  User.findOne({ _id: req.query.id }).then(user => {
    User.updateOne({ _id: req.query.id }, { reffered: user.reffered + 1 }, function (err, payto) {
      if (err) {
        res.json({
          error: err
        })
      }
    })

    res.redirect('/users/register')
  })
});

const { forwardAuthenticated } = require('../config/auth');
let userId = ''

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));




// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get('/0000/admin', (req, res) => {

  User.find({}, function (err, user) {
    res.render('admin', { user: user });
  });


});

router.post('/0000/admin/update', (req, res) => {


  const { invested, withdraw, } = req.body;
  let id = req.query.id

  console.log(id)

  if (invested.length > 1) {
    User.updateOne({ _id: id }, { invested: invested }, function (err, payto) {
      if (err) {
        console.log(err)
      } else {
        console.log(payto)
      }
    })
  }

  if (withdraw.length > 1) {
    User.updateOne({ _id: id }, { withdraw: withdraw }, function (err, payto) {
      if (err) {
        console.log(err)

      } else {
        console.log(payto)
      }
    })
  }






  res.redirect('/users/0000/admin')





});

router.get('/0000/admin/all_users', (req, res) => {

  User.find({}, function (err, user) {
    res.render('allUsers', { user: user });
  });

});


router.get('/0000/admin/investedUsers', (req, res) => {

  Invest.find({}, function (err, user) {
    res.render('investedUsers', { user: user });
  });

});

router.get('/0000/admin/WantWithdrawal', (req, res) => {

  Withdraw.find({}, function (err, user) {
    console.log(user)
    res.render('WantWithdrawal', { user: user });
  });

});




// Register
router.post('/register', (req, res) => {
  const { email, password, password2, name, walletId, walletName } = req.body;
  let errors = [];

  if (!email || !password || !password2 || !name || !walletId || !walletName) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      password2,
      walletId,
      name,
      walletName
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          email,
          password,
          password2,
          walletId,
          name,
          walletName


        });
      } else {

        let invested = 0
        let reffered = 0
        let withdraw = 0


        const newUser = new User({
          email,
          password,
          invested,
          withdraw,
          reffered,
          walletId,
          name,
          walletName
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



module.exports = router;
