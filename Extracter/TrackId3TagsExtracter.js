function extractAlbumFromFile(filePath) {
    return {
        "name": "album name"
    };
};

function extractArtistFromFile(filePath) {
    return {
        "name": "artist name"
    };
};

function extractTrackFromFile(filePath) {
    return {
        "name": "track name",
        "number": 1
    };
};

module.exports = {
  extractAlbumFromFile,
  extractArtistFromFile,
  extractTrackFromFile
}