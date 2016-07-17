var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  _id: Schema.Types.ObjectId,
  slug: String,
  artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  apiReference: String,
  createdAt: Date,
  updatedAt: Date
});

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;