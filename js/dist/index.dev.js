"use strict";

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

var _transition = _interopRequireDefault(require("./transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var H = new _highway["default"].Core({
  transitions: {
    "default": _transition["default"]
  } // home: Fade,
  // about: Slide

});