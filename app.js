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
            console.log(artist);
        });

        // var artist = artistManager.getArtist(values[1]['name']);
        // if (!artist) {
        //   winston.info('create artist "%s"', values[1]['artistName'], {'filePath': filePath});
        //   artist = artistManager.createArtist(values[1]['artistName']);
        // }
        //
        // var album = albumManager.getAlbum(values[1]['albumName'], artist._id);
        // if (!album) {
        //   winston.info('create album "%s"', albumRaw['albumName'], {'filePath': filePath});
        //   album = albumManager.createAlbum(albumRaw['albumName'], artist._id);
        // }
        //
        // var track = trackManager.getTrack(trackRaw['trackName'], album._id);
        // if (!track) {
        //   winston.info('create track "%s"', trackRaw['trackName'], {'filePath': filePath});
        //   track = trackManager.createTrack(trackRaw['trackName'], album._id);
        // }

      });
    });



    // async.waterfall([
    //   function(callback) { //Extract
    //     winston.info('Extract metadata from %s', filePath, {'filePath': filePath});
    //     var albumRaw = extracter.extractAlbumFromFile(filePath);
    //     var artistRaw = extracter.extractArtistFromFile(filePath);
    //     var trackRaw = extracter.extractTrackFromFile(filePath);
    //
    //     console.log(callback);
    //     callback(artistRaw, albumRaw, trackRaw);
    //   },
    //   function(artistRaw, albumRaw, trackRaw, callback) { //Transform
    //
    //     console.log(callback);
    //
    //     winston.info('Transform metadata from %s', filePath, {'filePath': filePath});
    //     normalizer.normalizeAlbumRaw(albumRaw);
    //     normalizer.normalizeArtistRaw(artistRaw);
    //     normalizer.normalizeTrackRaw(trackRaw);
    //   },
    //   function(artistRaw, albumRaw, trackRaw, callback) { //Create library entries
    //     var artist = artistManager.getArtist(artistRaw['artistName']);
    //     if (!artist) {
    //       winston.info('create artist "%s"', artistRaw['artistName'], {'filePath': filePath});
    //       artist = artistManager.createArtist(artistRaw['artistName']);
    //     }
    //
    //     var album = albumManager.getAlbum(albumRaw['albumName'], artist._id);
    //     if (!album) {
    //       winston.info('create album "%s"', albumRaw['albumName'], {'filePath': filePath});
    //       album = albumManager.createAlbum(albumRaw['albumName'], artist._id);
    //     }
    //
    //     var track = trackManager.getTrack(trackRaw['trackName'], album._id);
    //     if (!track) {
    //       winston.info('create track "%s"', trackRaw['trackName'], {'filePath': filePath});
    //       track = trackManager.createTrack(trackRaw['trackName'], album._id);
    //     }
    //   },
    //   function(artistRaw, albumRaw, trackRaw, artist, album, track, callback) { // Api calls
    //     var client = new miniwaveMeApiClient('test', 'test');
    //
    //     var artistApiReference = artist.apiReference;
    //     if (!artistApiReference) {
    //       winston.info('create artist "%s" on api', artistRaw['name'], {'filePath': filePath});
    //       artistApiReference = client.createArtist(artistRaw['name']);
    //     }
    //
    //     var albumApiReference = album.apiReference;
    //     if (!albumApiReference) {
    //       winston.info('create album "%s" on api', albumRaw['albumName'], {'filePath': filePath});
    //       albumApiReference = client.createAlbum(albumRaw['albumName'], albumRaw['year'], artistApiReference);
    //     }
    //
    //     var trackApiReference = track.apiReference;
    //     if (!trackApiReference) {
    //       winston.info('create album "%s" on api', albumRaw['trackName'], {'filePath': filePath});
    //       var trackFile = convertToOgg(filePath); //TODO
    //       trackApiReference = client.addTrack(albumRaw['trackNumber'], albumRaw['trackName'], null, albumApiReference);
    //     }
    //   },
    //   function(artistRaw, albumRaw, trackRaw, artist, album, track, callback) { // Update library entries with API Data
    //     winston.info('update entries on api', {'filePath': filePath});
    //     artistManager.updateArtist(artist._id, artistRaw['artistName', artistApiReference]);
    //     albumManager.updateAlbum(album._id, albumRaw['albumName'], album._id, albumApiReference);
    //     trackManager.updateTrack(track._id, trackRaw['trackName'], null, album._id, trackApiReference);
    //   }
    //]);
  });
}