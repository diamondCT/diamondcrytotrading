const express = require('express');
const router = express.Router();
const Invest = require('../models/Invest');
const Withdraw = require('../models/Withdraw');


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
let userD = ''
// Welcome Page
router.get('/', (req, res) => res.render('welcome'));


router.get('/investNow', ensureAuthenticated, (req, res) => {
  res.render('invest')
});

router.post('/investNow', ensureAuthenticated, (req, res) => {
  const { amount, method,plan } = req.body;
  let errors = [];

  if (!amount || !method || !plan) {
    errors.push({ msg: 'Please enter all fields' });
  }



  if (errors.length > 0) {
    res.render('investNow', {
      errors,
      amount,
      method,
      plan

    });
  } else {

    const newUser = new Invest({
      amount,
      method,
      plan,
      email: userD.email


    });


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
  }

});


router.get('/withdrawNow', ensureAuthenticated, (req, res) => res.render('withdraw', {
  user: userD
}));

router.post('/withdrawNow', ensureAuthenticated, (req, res) => {
  const { amount, method,plan } = req.body;
  let errors = [];

  if (!amount || !method ) {
    errors.push({ msg: 'Please enter all fields' });
  }



  if (errors.length > 0) {
    res.render('withdraw', {
      errors,
      amount,
      method,

    });
  } else {

    const newUser = new Withdraw({
      amount,
      method,
      email: userD.email,
      walletId: userD.walletId, 
      walletName: userD.walletName,
    });


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
  }
});



// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  userD = req.user
  res.render('dashboard', {
    user: req.user
  })
}

);

module.exports = router;
