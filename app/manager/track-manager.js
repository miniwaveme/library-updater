var slug = require('slug');
var Track = require('./../schema/track');
var Artist = require('./../schema/artist');
var Album = require('./../schema/album');

function getTrack(number, albumId) {
  return new Promise(function (resolve, reject) {
    resolve(new Track({
      _id: 'test',
      slug: slug('track name'),
      createdAt: new Date(),
      updatedAt: new Date(),
      album : new Album({
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
      })
    }));
  });
};

function createTrack(number, name, artists, albumId) {
  return new Track({
    _id: 'test',
    slug: slug('track name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    album : new Album({
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
    })
  });
};

function updateTrack(number, name, artists, albumId) {
  return new Track({
    _id: 'test',
    slug: slug('track name'),
    createdAt: new Date(),
    updatedAt: new Date(),
    album : new Album({
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
    })
  });
};

module.exports = {
  getTrack,
  createTrack,
  updateTrack
}