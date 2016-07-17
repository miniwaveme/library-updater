var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  slug: { type: String, required: true, unique: true },
  apiReference: { type: String, required: true, unique: true },
  createdAt: Date,
  updatedAt: Date
});

var Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;