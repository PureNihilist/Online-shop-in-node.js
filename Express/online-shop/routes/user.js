var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Cart = require('../models/cart');
var Order = require('../models/order');

var csrfProtection = csrf();
router.use(csrfProtection);
//dla zalogowanych
router.get('/profile',isLoggedIn, function(req, res, next){ //tylko referencja do isLoggedIn
  Order.find({user: req.user}, function(err, orders) {  //porownuje user z bazy danych z req.user (zalogowany user)
      if (err) {
          return res.write('Error!');
      }
      //sukces, dostalem order z bazy danych
      var cart; 
      orders.forEach(function(order) {
        cart = new Cart(order.cart);
        order.items = cart.generateArray();
      });
      res.render('user/profile', { orders: orders });
  });
});

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.use('/',notLoggedIn, function(req, res, next){
    next();
});
//dla niezalogowanych
router.get('/signup', function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), function(req, res, next) { // jak poprawnie sie zalogowano
    if(req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else { //niemamy oldUrl czyli nie wracamy z checkout'a
        res.redirect('/user/profile');
    }
});

router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), function(req, res, next) { // jak poprawnie sie zalogowano
    if(req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else { //niemamy oldUrl czyli nie wracamy z checkout'a
        res.redirect('/user/profile');
    }
});

module.exports = router;
//ochrona sciezek routingu - dostepne tylko po zalogowaniu
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) { //z pakietu password
        return next(); // continue
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/');
}