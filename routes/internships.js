var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/internship');
var Internship = mongoose.model('Internship');
require('../models/user');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/favorited', function(req, res, next) {
	if(!req.session.username) {
		res.send({
			error: "No user found."
		})
	} else {
		var query = {username: req.session.username},
		options = { upsert: true, new: true, setDefaultsOnInsert: true };
		User.find({username: req.session.username}, function(err, user) {
			if(user.length) { 
				res.send({
					favorited: user.favorited
				})
			} else {
				var user = new User();
				user.username = req.session.username;
				user.save(function(err) {
					res.send({
						favorited: []
					})
				})
			}
		})
	}
});
router.post('/favorite', function(req, res, next) {
	if(!req.session.username) {
		res.send({
			error: "No user found."
		})
	} else {
		var query = {username: req.session.username},
		options = { upsert: true, new: true, setDefaultsOnInsert: true };
		User.findOneAndUpdate({username: req.session.username},  {$push: {"favorited": req.body.id}},
			{safe: true, upsert: true},
			function(err, user) {
				if(err) {
					console.log(err);
				} else if(user.length) { 
					// successfully favorited a session
					res.send({
						favorited: user.favorited
					})
				} else {
					// trying to favorite something without being logged in
					res.end();
				}
			})
	}
});
router.post('/getInternships', function(req, res, next) {
	console.log("yo")
	Internship.paginate({}, { page: req.body.page, limit: req.body.amount }, function(err, result) {
    if(result.docs) {
    	console.log(result)
    	res.send({
    		internships: result.docs
    	})
    } else {
    	// send error message (req.errormessage)
    }
    // result.docs 
    // result.total 
    // result.limit - 10 
    // result.page - 3 
    // result.pages 
	});

});



module.exports = router;
