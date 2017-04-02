var express = require('express');
var router = express.Router();
var needle = require('needle');
var mongoose = require('mongoose');
require('../models/user');
var User = mongoose.model('User');
/* GET home page. */
router.post('/login', function(req, res, next) {
	var options = {
  		headers: { 'Content-Type': 'x-www-form-urlencoded' }
	}
	needle.post('https://hsregistration.dalton.org/src/server/index.php/login', 'username='+req.body.username + '&password=' + req.body.password, options, function(err, resp) {
	  if(err) 
	  	console.log(err)
	  if(!resp.body.logged_in) {
	  	// send flash to client (req.errormessage)
	  } else {
	  	if(req.body.rememberMe) {
  			req.session.cookie.maxAge = 2628000000;
	  	} 
	  	req.session.username = req.body.username;
	  	var query = {username: req.session.username},
    	options = { upsert: true, new: true, setDefaultsOnInsert: true };
    	User.find({username: req.session.username}, function(err, user) {
    		if(!user.length) { 
    			var user = new User();
    			user.username = req.session.username;
    			user.save(function(err) {
    				res.send({authed: resp.body.logged_in})
    			})
    		} else {
    			res.send({authed: resp.body.logged_in});
    		}
    	})
	  }
	});
});
router.post('/authed', function(req, res, next) {
	if(!req.session.username) {
		res.send({authed: false});
	} else {
		console.log(req.session.username)
		res.send({authed: true});
	}
});
router.post('/logout', function(req, res, next) {
	req.session.username = "";
	res.end();
});


module.exports = router;
