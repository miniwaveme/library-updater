var slug = require('slug');
var Artist = require('./../schema/artist');
var Album = require('./../schema/album');

function getArtist(name) {
  return new Promise(function (resolve, reject) {
    resolve(new Artist({
      _id: 'test',
      slug: slug('artist name'),
      createdAt: new Date(),
      updatedAt: new Date(),
      apiReference: 'apiReference'
    }));
  });
};

function createArtist(name) {
  return new Promise(function (resolve, reject) {
    resolve(new Artist({
      _id: 'test',
      slug: slug('artist name'),
      createdAt: new Date(),
      updatedAt: new Date(),
      apiReference: null
    }));
  });
};

function updateArtist(id, name, apiReference) {
  return new Artist({
    _id: 'test',
    slug: slug('artist name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    apiReference: 'apiReference'
  });
};

module.exports = {
    getArtist,
    createArtist,
    updateArtist
};
