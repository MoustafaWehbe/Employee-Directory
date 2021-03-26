"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuidv4 = uuidv4;
exports.getRandomItem = getRandomItem;

var mongoose = require('mongoose');

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(24);
  });
}

function getRandomItem(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var item = arr[randomIndex];
  return item;
}