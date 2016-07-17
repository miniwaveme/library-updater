var fs = require('file-system');

module.exports = function(directory, callback) {
  fs.recurse(directory, [
    '**/*.wav',
    '**/*.mp3',
    '**/*.flac',
    '**/*.ogg'
  ], function(filepath, relative, filename) {
      if (!filename) return;
      callback(filename);
  });
};