var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var internshipSchema = mongoose.Schema({
	companyType: String,
	description: String
});
internshipSchema.plugin(mongoosePaginate);

mongoose.model('Internship', internshipSchema);