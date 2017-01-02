#!/usr/bin/env node
'use strict';

const program = require('commander');
const Promise = require('bluebird');
const winston = require('winston');
const async = require('async');

const fileSystemTrackFinder = require('./app/finder/file-system-track-finder');
const convertToOgg = require('./app/converter/track-converter');
const extracter = require('./app/extracter/track-id3-tags-extracter');
const normalizer = require('./app/normalizer/normalizer');
const artistManager = require('./app/manager/artist-manager');
const albumManager = require('./app/manager/album-manager');
const trackManager = require('./app/manager/track-manager');
const miniwaveMeApiClient = require('./app/api-client/client');

winston.cli();

program
  .version('0.0.1')
  .command('update <directory>')
  .action(function (directory) {

     updateLibrary(directory);
  })
;

program.parse(process.argv);
function updateLibrary(directory) {
  fileSystemTrackFinder(directory, function(filePath) {
    winston.info('Extract metadata from %s', filePath, {'filePath': filePath});
    Promise.all([
      extracter.extractAlbumFromFile(filePath),
      extracter.extractArtistFromFile(filePath),
      extracter.extractTrackFromFile(filePath)
    ]).then((values) => {
      winston.info('Transform metadata from %s', filePath, {'filePath': filePath});
      Promise.all([
        normalizer.normalizeAlbumRaw(values[0]),
        normalizer.normalizeArtistRaw(values[1]),
        normalizer.normalizeTrackRaw(values[2])
      ]).then((values) => {

        var client = new miniwaveMeApiClient('test', 'test');

        var albumRaw = values[0];
        var artistRaw = values[1];
        var trackRaw = values[2];

        var artist;
        var album
        var track;

        artistManager.getArtist(artistRaw).then(function(result) {
          artist = result;
          if (artist === null) {
              winston.info('re-use artist "%s"', artist['slug'], {'filePath': filePath});
              return new Promise(function(resolve) {
                resolve(artist);
              });
          }

          winston.info('create artist "%s"', artistRaw['name'], {'filePath': filePath});
          return artistManager.createArtist(artistRaw['name']);
        }).then(function (artist) {
          var artistApiReference = artist.apiReference;
          if (!artistApiReference) {
            winston.info('create artist "%s" on api', artistRaw['name'], {'filePath': filePath});
            artistApiReference = client.createArtist(artistRaw['name']);
          }

           albumManager.getAlbum(albumRaw, artist._id).then(function(result) {

            album = result;
            if (album === null) {
                winston.info('re-use album "%s"', album['slug'], {'filePath': filePath});
                return new Promise(function(resolve) {
                  resolve(album);
                });
            }

            winston.info('create album "%s"', albumRaw['name'], {'filePath': filePath});
            return albumManager.createAlbum(albumRaw['name']);
          }).then(function(album) {

            var albumApiReference = album.apiReference;
            if (!albumApiReference) {
              winston.info('create album "%s" on api', albumRaw['name'], {'filePath': filePath});
              albumApiReference = client.createAlbum(albumRaw['name'], albumRaw['year'], artistApiReference);
            }

            trackManager.getTrack(trackRaw, album._id).then(function(result) {

              track = result;
              if (track === null) {
                winston.info('re-use track "%s"', track['slug'], {'filePath': filePath});
                return new Promise(function(resolve) {
                  resolve(track);
                });
              }
              winston.info('create track "%s"', trackRaw['name'], {'filePath': filePath});
              return trackManager.createTrack(trackRaw['number'], trackRaw['name']);
            }).then(function (track) {
              var trackApiReference = track.apiReference;
              if (!trackApiReference) {
                winston.info('create track "%s" on api', trackRaw['name'], {'filePath': filePath});
                trackApiReference = client.addTrack(trackRaw['number'], trackRaw['name'], null, albumApiReference);
              }

              winston.info('update entries on api', {'filePath': filePath});
              artistManager.updateArtist(artist._id, artistRaw['artistName', artistApiReference]);
              albumManager.updateAlbum(album._id, albumRaw['albumName'], album._id, albumApiReference);
              trackManager.updateTrack(track._id, trackRaw['trackName'], null, album._id, trackApiReference);
            });
          });
        });
      });
    });
  });
}
