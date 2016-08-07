'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageExists = exports.copyImageToClipboard = undefined;

var _electron = require('electron');

var getDataUri = function getDataUri(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.responseType = "blob";
  xhr.onload = function () {
    var reader = new FileReader();

    reader.onloadend = function () {
      callback(reader.result);
    };

    reader.readAsDataURL(xhr.response);
  };

  xhr.open('GET', url);
  xhr.send();
};

var copyImageToClipboard = exports.copyImageToClipboard = function copyImageToClipboard(url, callback) {
  getDataUri(url, function (uri) {
    var img = _electron.nativeImage.createFromDataURL(uri);

    _electron.clipboard.writeImage(img);
  });
};

var imageExists = exports.imageExists = function imageExists(url, callback) {
  var img = new Image();

  img.onload = function () {
    return callback(true);
  };
  img.onerror = function () {
    return callback(false);
  };

  img.src = url;
};