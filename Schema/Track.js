var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
  _id: Schema.Types.ObjectId,
  path: { type: String, required: true, unique: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
  pathMd5: { type: String, required: true, unique: true },
  trackNumber: { type: Number, required: true },
  createdAt: Date,
  updatedAt: Date
});

var Track = mongoose.model('Track', trackSchema);
module.exports = Track;