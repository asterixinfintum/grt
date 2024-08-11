"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _axios = _interopRequireDefault(require("axios"));
var _bitcoreLib = _interopRequireDefault(require("bitcore-lib"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//coffee, mixture, dog, excess, thought, swallow, mimic, hero, damp, obtain, poverty, fantasy
require('dotenv').config();
var receiveRoute = _express["default"].Router();
var _default = exports["default"] = receiveRoute;