"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bitcoinRoute = _interopRequireDefault(require("./bitcoinRoute"));
var _sendasset = _interopRequireDefault(require("./sendasset"));
var _admin = _interopRequireDefault(require("./admin"));
var _auth = _interopRequireDefault(require("./auth"));
var _dashboard = _interopRequireDefault(require("./dashboard"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = {
  bitcoinRoute: _bitcoinRoute["default"],
  sendRoute: _sendasset["default"],
  adminRoute: _admin["default"],
  authRoute: _auth["default"],
  dashBoardRoute: _dashboard["default"]
}; //wallet5 testing wallet