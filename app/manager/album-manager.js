var slug = require('slug');
var Album = require('./../schema/album');
var Artist = require('./../schema/artist');

function getAlbum(name, artistId) {
  return new Album({
    _id: 'test',
    artist: new Artist({
      _id: 'test',
      slug: slug('artist name'),
      createdAt: new Date(),
      updatedAt: new Date(),
      apiReference: 'apiReference'
    }),
    slug: slug('album name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    apiReference: 'apiReference'
  });
};

function createAlbum(name) {
  return new Album({
    _id: 'test',
    artist: new Artist({
      _id: 'test',
      slug: slug('artist name'),
      createdAt: new Date(),
      updatedAt: new Date(),
      apiReference: 'apiReference'
    }),
    slug: slug('album name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    apiReference: 'apiReference'
  });
};

function updateAlbum(id, name, apiReference) {
  return new Album({
    _id: 'test',
    artist: new Artist({
      _id: 'test',
      slug: slug('artist name'),
      createdAt: new Date(),
      updatedAt: new Date(),
      apiReference: 'apiReference'
    }),
    slug: slug('album name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    apiReference: 'apiReference'
  });
};

module.exports = {
  getAlbum,
  createAlbum,
  updateAlbum
}