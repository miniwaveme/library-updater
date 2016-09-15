#!/usr/bin/env node
'use strict';

var program = require('commander');

var fileSystemTrackFinder = require('./Finder/FileSystemTrackFinder');
var convertToOgg = require('./Converter/TrackConverter');
var extracter = require('./Extracter/TrackId3TagsExtracter');
var normalizer = require('./Normalizer/Normalizer');
var artistManager = require('./Manager/ArtistManager');
var albumManager = require('./Manager/AlbumManager');
var trackManager = require('./Manager/TrackManager');
var MiniWaveMeApiClient = require('./ApiClient/Client');

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


    // Extract
    var albumRaw = extracter.extractAlbumFromFile(filePath);
    var artistRaw = extracter.extractArtistFromFile(filePath);
    var trackRaw = extracter.extractTrackFromFile(filePath);

    // Transform
    normalizer.normalizeAlbumRaw(albumRaw);
    normalizer.normalizeArtistRaw(artistRaw);
    normalizer.normalizeTrackRaw(trackRaw);
    var trackFile = convertToOgg(filePath);

    // Load
    //// Create library entries
    var artist = artistManager.getArtist(artistRaw['artistName']);
    if (!artist) {
      artist = artistManager.createArtist(artistRaw['artistName']);
    }

    var album = albumManager.getAlbum(albumRaw['albumName'], artist._id);
    if (!album) {
      album = albumManager.createAlbum(albumRaw['albumName'], artist._id);
    }

    var track = trackManager.getTrack(trackRaw['trackName'], album._id);
    if (!track) {
      track = trackManager.createTrack(trackRaw['trackName'], album._id);
    }

    // Api calls
    var client = new MiniWaveMeApiClient('test', 'test');

    var artistApiReference = artist.apiReference;
    if (!artistApiReference) {
      artistApiReference = client.createArtist(artistRaw.name);
    }

    var albumApiReference = album.apiReference;
    if (!albumApiReference) {
      albumApiReference = client.createAlbum(albumRaw['albumName'], albumRaw['year'], artistApiReference);
    }

    var trackApiReference = track.apiReference;
    if (!trackApiReference) {
      trackApiReference = client.addTrack(albumRaw['trackNumber'], albumRaw['trackName'], null, albumApiReference);
    }

    //// Update library entries with API Data
    artistManager.updateArtist(artist._id, artistRaw['artistName', artistApiReference]);
    albumManager.updateAlbum(album._id, albumRaw['albumName'], album._id, albumApiReference);
    trackManager.updateTrack(track._id, trackRaw['trackName'], null, album._id, trackApiReference);
  });
}