var method = Client.prototype;

function Client(appKey, appSecret) {
    this.appKey = appKey;
    this.appSecret = appSecret;
}

method.createArtist = function() {
    return 'test';
};

method.createAlbum = function() {
    return 'test';
};

method.addTrack = function() {
  return 'test';
}

module.exports = Client;