var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	username: String,
	favorited: {type: Array, default: []}
});

mongoose.model('User', userSchema);