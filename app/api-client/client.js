var method = Client.prototype;

function Client(appKey, appSecret) {
    this.appKey = appKey;
    this.appSecret = appSecret;
}

method.createArtist = function() {
    return new Promise(function (resolve, reject) {
      resolve('test');
    });
};

method.createAlbum = function() {
  return new Promise(function (resolve, reject) {
    resolve('test');
  });
};

method.addTrack = function() {
  return new Promise(function (resolve, reject) {
    resolve('test');
  });
}

module.exports = Client;
