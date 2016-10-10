function normalizeAlbumRaw(albumRaw) {
  return new Promise(function (resolve, reject) {
    resolve(albumRaw);
  });
};

function normalizeArtistRaw(artistRaw) {
  return new Promise(function (resolve, reject) {
    resolve(artistRaw);
  });
};

function normalizeTrackRaw(trackRaw) {
  return new Promise(function (resolve, reject) {
    resolve(trackRaw);
  });
};

module.exports = {
  normalizeAlbumRaw,
  normalizeArtistRaw,
  normalizeTrackRaw
}