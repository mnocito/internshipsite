var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/internship');
var Internship = mongoose.model('Internship');
require('../models/user');
var User = mongoose.model('User');

router.get('/favoritedCards', function(req,res,next){
	if(req.session.username){
		User.findOne({username: req.session.username}, function(err, user) {
			if(err){
				console.log(err)
			}
			if(user) {
				var returnFavorites = user.favorited;
				for(var i = 0; i < user.favorited; i++) {
					user.favorited[i] = mongoose.Types.ObjectId(user.favorited[i]);
				}
				Internship.find({'_id': {$in: user.favorited}}, function(err, favoritedCards) {
				     res.send({
	     				favoritedCards: favoritedCards,
	     				favorited: returnFavorites
	    			})
				});
			} else {
				res.send({errormessage: "No user found."})
			}
		});
	} else {
		res.send({errormessage: "No user found."})
	}
})
router.get('/favorited', function(req,res,next){
	if(req.session.username){
		User.findOne({username: req.session.username}, function(err, user) {
			if(err){
				console.log(err)
			}
			if(user) {
				res.send({
					favorited: user.favorited
				})	
			} else {
				res.send({errormessage: "No user found."})
			}
		});
	} else {
		res.send({errormessage: "No user found."})
	}
})
/* GET users listing. */
router.post('/favorite', function(req, res, next) {
	if(!req.session.username) {
		res.send({
			errormessage: "No user found."
		})
	} else {
		console.log("body: " + req.body)
		console.log(req.body)
		console.log("logged body and data")
		User.findOneAndUpdate({username: req.session.username},  {$push: {"favorited": req.body.id}},
			{safe: true, upsert: true},
			function(err, user) {
				if(err) {
					console.log(err);
				} else if(user) { 
					console.log(user.favorited);
					// successfully favorited a session
					res.send({
						favorited: user.favorited
					})
				} else {
					// trying to favorite something without being logged in
					console.log("user doesnt exist")
					res.end();
				}
			})
	}
});

router.post('/getInternships', function(req, res, next) {
	console.log("yo")
	Internship.paginate({}, { page: req.body.page, limit: req.body.amount }, function(err, result) {
    if(result.docs) {
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
