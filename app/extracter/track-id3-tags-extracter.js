const Promise = require('bluebird');
const mediaInfoParser = Promise.promisifyAll(require('mediainfo-parser'));

function extractAlbumFromFile(filePath) {
  return new Promise(function (resolve, reject) {
    return mediaInfoParser.execAsync(filePath).then(function(obj) {
      for (var i = 0; i < obj.file.track.length; i++) {
        if (obj.file.track[i]._type === 'General') {
          resolve({
            "name": obj.file.track[i].album
          });
        }
      }
    });
  });
};

function extractArtistFromFile(filePath) {
  return new Promise(function (resolve, reject) {
    return mediaInfoParser.execAsync(filePath).then(function(obj) {
      for (var i = 0; i < obj.file.track.length; i++) {
        if (obj.file.track[i]._type === 'General') {
          resolve({
            "name": obj.file.track[i].performer
          });
        }
      }
    });
  });
};

function extractTrackFromFile(filePath) {
  return new Promise(function (resolve, reject) {
    return mediaInfoParser.execAsync(filePath).then(function(obj) {
      for (var i = 0; i < obj.file.track.length; i++) {
        if (obj.file.track[i]._type === 'General') {
          resolve({
            "name": obj.file.track[i].title,
            "number": obj.file.track[i].trackNamePosition
          });
        }
      }
    });
  });
};

module.exports = {
  extractAlbumFromFile,
  extractArtistFromFile,
  extractTrackFromFile
}