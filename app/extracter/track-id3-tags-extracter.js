var mediaInfoParser = require('mediainfo-parser');

function extractAlbumFromFile(filePath) {
  return mediaInfoParser.exec(filePath, (err, obj) => {
      obj.file.track.forEach(function(track) {
      if (track._type === 'General') {
        return {
          "name": track.album
        };
      }
    });
  });
};

function extractArtistFromFile(filePath) {
  return mediaInfoParser.exec(filePath, (err, obj) => {
      obj.file.track.forEach(function(track) {
      if (track._type === 'General') {
        return {
          "name": track.performer
        };
      }
    });
  });
};

function extractTrackFromFile(filePath) {
  return mediaInfoParser.exec(filePath, (err, obj) => {
      obj.file.track.forEach(function(track) {
      if (track._type === 'General') {
        return {
          "name": track.title,
          "number": track.trackNamePosition
        };
      }
    });
  });
};

module.exports = {
  extractAlbumFromFile,
  extractArtistFromFile,
  extractTrackFromFile
}