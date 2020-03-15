"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

function isDef(value) {
  return value !== undefined && value !== null;
}

exports.isDef = isDef;

function isObj(x) {
  var type = _typeof(x);

  return x !== null && (type === 'object' || type === 'function');
}

exports.isObj = isObj;

function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

exports.isNumber = isNumber;

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

exports.range = range;

function nextTick(fn) {
  setTimeout(function () {
    fn();
  }, 1000 / 30);
}

exports.nextTick = nextTick;
var systemInfo = null;

function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

exports.getSystemInfoSync = getSystemInfoSync;

function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? value + "px" : value;
}

exports.addUnit = addUnit;