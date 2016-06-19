var express = require('express');
var passport = require('passport');
//var mongoose = require('mongoose');
var Account = require('../models/account');
var router = express.Router();

//mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) return res.render('register', { error : err.message });
        
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

router.post('/deleteAccount', function(req, res, next) {
    var username = req.body.Username;
    console.log(username);

    Account.findOneAndRemove({ username: req.body.Username }, function(err) {
        if (err) throw err;
        console.log('User deleted!');
    });

    res.redirect('/');
});

module.exports = router;
