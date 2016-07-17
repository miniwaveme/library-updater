var slug = require('slug');
var Artist = require('./../Schema/Artist');
var Album = require('./../Schema/Album');

function getArtist(name) {
  return new Artist({
    _id: 'test',
    slug: slug('artist name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    apiReference: 'apiReference'
  });
};

function createArtist(name) {
  return new Artist({
    _id: 'test',
    slug: slug('artist name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    apiReference: 'apiReference'
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