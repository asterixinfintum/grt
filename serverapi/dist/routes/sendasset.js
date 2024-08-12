"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ethers = require("ethers");
var _axios = _interopRequireDefault(require("axios"));
var _bitcoreLib = _interopRequireDefault(require("bitcore-lib"));
var _pendingtxndt = _interopRequireDefault(require("../models/pendingtxndt"));
var _useraddress = _interopRequireDefault(require("../models/useraddress"));
var _transaction = _interopRequireDefault(require("../models/transaction"));
var _ethPrice = _interopRequireDefault(require("../ethereumFunctions/ethPrice"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
require('dotenv').config();
var _require = require('../ethereumFunctions/gasEstimator'),
  estimateEthGas = _require.estimateEthGas;
function sendTokenAsset(_x, _x2, _x3, _x4) {
  return _sendTokenAsset.apply(this, arguments);
}
function _sendTokenAsset() {
  _sendTokenAsset = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(tokenAddress, toAddress, amount, privateKey) {
    var gasLimit,
      gasPriceGwei,
      provider,
      wallet,
      abi,
      contract,
      decimals,
      amountInTokenUnits,
      balance,
      gasPrice,
      tx,
      estimatedGas,
      transaction,
      _receipt,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          gasLimit = _args6.length > 4 && _args6[4] !== undefined ? _args6[4] : 100000;
          gasPriceGwei = _args6.length > 5 && _args6[5] !== undefined ? _args6[5] : '40';
          // Connect to the Ethereum network
          provider = new _ethers.ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET); // Create a wallet instance
          wallet = new _ethers.ethers.Wallet(privateKey, provider); // The ERC-20 Token ABI (Application Binary Interface)
          abi = ["function transfer(address to, uint256 amount) returns (bool)", "function decimals() view returns (uint8)", "function balanceOf(address account) view returns (uint256)"]; // Create contract instance
          contract = new _ethers.ethers.Contract(tokenAddress, abi, wallet);
          _context6.prev = 6;
          _context6.next = 9;
          return contract.decimals();
        case 9:
          decimals = _context6.sent;
          amountInTokenUnits = _ethers.ethers.utils.parseUnits(amount.toString(), decimals); // Check balance
          _context6.next = 13;
          return contract.balanceOf(wallet.address);
        case 13:
          balance = _context6.sent;
          if (!balance.lt(amountInTokenUnits)) {
            _context6.next = 16;
            break;
          }
          throw new Error('Insufficient token balance');
        case 16:
          // Prepare transaction with manual gas settings
          gasPrice = _ethers.ethers.utils.parseUnits(gasPriceGwei, 'gwei');
          _context6.next = 19;
          return contract.populateTransaction.transfer(toAddress, amountInTokenUnits);
        case 19:
          tx = _context6.sent;
          tx.gasLimit = _ethers.ethers.BigNumber.from(gasLimit);
          tx.gasPrice = gasPrice;

          // Estimate gas and adjust if necessary
          _context6.prev = 22;
          _context6.next = 25;
          return wallet.estimateGas(tx);
        case 25:
          estimatedGas = _context6.sent;
          tx.gasLimit = estimatedGas.mul(120).div(100); // Add 20% buffer
          _context6.next = 32;
          break;
        case 29:
          _context6.prev = 29;
          _context6.t0 = _context6["catch"](22);
          console.warn('Gas estimation failed, using manual limit');
        case 32:
          _context6.next = 34;
          return wallet.sendTransaction(tx);
        case 34:
          transaction = _context6.sent;
          console.log('Transaction sent:', transaction.hash);
          _context6.next = 38;
          return transaction.wait();
        case 38:
          _receipt = _context6.sent;
          console.log('Transaction confirmed in block:', _receipt.blockNumber);
          return _context6.abrupt("return", _receipt.blockNumber);
        case 43:
          _context6.prev = 43;
          _context6.t1 = _context6["catch"](6);
          console.error('Error sending token:', _context6.t1);
          throw _context6.t1;
        case 47:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[6, 43], [22, 29]]);
  }));
  return _sendTokenAsset.apply(this, arguments);
}
function getEthRealBalanceForEstimate(_x5) {
  return _getEthRealBalanceForEstimate.apply(this, arguments);
}
function _getEthRealBalanceForEstimate() {
  _getEthRealBalanceForEstimate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(walletAddress) {
    var provider, balanceWei, balanceEth;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          provider = new _ethers.ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);
          _context7.next = 4;
          return provider.getBalance(walletAddress);
        case 4:
          balanceWei = _context7.sent;
          balanceEth = _ethers.ethers.utils.formatEther(balanceWei);
          return _context7.abrupt("return", balanceEth);
        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          console.error('Error fetching ETH balance:', _context7.t0);
        case 12:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 9]]);
  }));
  return _getEthRealBalanceForEstimate.apply(this, arguments);
}
var sendRoute = _express["default"].Router();
sendRoute.post('/sendtransaction', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$query, walletid, transactionid, pndtxn, userAddr, btcmode, ethmode, usdtmode, expensiveFeeBTC, expensiveFeeETH, ethPrivateKey, chain, trnx, _trnx, _trnx2, message, pauseTrade, pendingMesg;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, walletid = _req$query.walletid, transactionid = _req$query.transactionid;
          _context.next = 4;
          return _pendingtxndt["default"].findOne({
            _id: transactionid
          });
        case 4:
          pndtxn = _context.sent;
          _context.next = 7;
          return _useraddress["default"].findOne({
            uniqueid: pndtxn.from
          });
        case 7:
          userAddr = _context.sent;
          btcmode = userAddr.btcmode, ethmode = userAddr.ethmode, usdtmode = userAddr.usdtmode, expensiveFeeBTC = userAddr.expensiveFeeBTC, expensiveFeeETH = userAddr.expensiveFeeETH, ethPrivateKey = userAddr.ethPrivateKey;
          chain = pndtxn.chain;
          if (!(chain === "BTC")) {
            _context.next = 25;
            break;
          }
          if (!(btcmode === "manual")) {
            _context.next = 17;
            break;
          }
          trnx = new _transaction["default"]({
            walletid: walletid,
            label: 'Bitcoin trnx',
            type: "outgoing",
            amount: parseFloat(pndtxn.value),
            userBalanceAtOccurence: parseFloat(userAddr.adminBtcBalance),
            assetType: pndtxn.asset
          });
          _context.next = 15;
          return trnx.save();
        case 15:
          _context.next = 23;
          break;
        case 17:
          if (!(btcmode === "fake")) {
            _context.next = 23;
            break;
          }
          _context.next = 20;
          return sendTokenAsset(process.env.FAKEBTC_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey);
        case 20:
          receipt = _context.sent;
          _context.next = 23;
          break;
        case 23:
          _context.next = 48;
          break;
        case 25:
          if (!(chain === "USDT")) {
            _context.next = 38;
            break;
          }
          if (!(usdtmode === "manual")) {
            _context.next = 32;
            break;
          }
          _trnx = new _transaction["default"]({
            walletid: walletid,
            label: 'USDT trnx',
            type: "outgoing",
            amount: parseFloat(pndtxn.value),
            userBalanceAtOccurence: parseFloat(userAddr.adminUsdtBalance),
            assetType: pndtxn.asset
          });
          _context.next = 30;
          return _trnx.save();
        case 30:
          _context.next = 36;
          break;
        case 32:
          if (!(usdtmode === "fake")) {
            _context.next = 36;
            break;
          }
          _context.next = 35;
          return sendTokenAsset(process.env.FAKEUSDT_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey);
        case 35:
          receipt = _context.sent;
        case 36:
          _context.next = 48;
          break;
        case 38:
          if (!(ethmode === "manual")) {
            _context.next = 44;
            break;
          }
          _trnx2 = new _transaction["default"]({
            walletid: walletid,
            label: 'ETH trnx',
            type: "outgoing",
            amount: parseFloat(pndtxn.value),
            userBalanceAtOccurence: parseFloat(userAddr.adminEthBalance),
            assetType: pndtxn.asset
          });
          _context.next = 42;
          return _trnx2.save();
        case 42:
          _context.next = 48;
          break;
        case 44:
          if (!(ethmode === "fake")) {
            _context.next = 48;
            break;
          }
          _context.next = 47;
          return sendTokenAsset(process.env.FAKEETH_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey);
        case 47:
          receipt = _context.sent;
        case 48:
          pauseTrade = userAddr.pauseTrade, pendingMesg = userAddr.pendingMesg;
          if (pauseTrade && pendingMesg.length) {
            message = pendingMesg;
          } else {
            message = 'Transaction broadcasted successfully';
          }
          res.status(200).json({
            message: message,
            pauseTrade: pauseTrade
          });
          _context.next = 55;
          break;
        case 53:
          _context.prev = 53;
          _context.t0 = _context["catch"](0);
        case 55:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 53]]);
  }));
  return function (_x6, _x7) {
    return _ref.apply(this, arguments);
  };
}());
sendRoute.get('/estimatefee', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$query2, chain, value, walletid, userAddress, btcmode, ethmode, usdtmode, expensiveFeeBTC, expensiveFeeETH, useExpensivefee, gasFee, ethPrice, btcPrice, gasFeeInUsdt, expensiveFee, btcexchangeresp, _expensiveFee, fee, _btcexchangeresp;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$query2 = req.query, chain = _req$query2.chain, value = _req$query2.value, walletid = _req$query2.walletid;
          _context4.next = 4;
          return _useraddress["default"].findOne({
            uniqueid: walletid
          });
        case 4:
          userAddress = _context4.sent;
          btcmode = userAddress.btcmode, ethmode = userAddress.ethmode, usdtmode = userAddress.usdtmode, expensiveFeeBTC = userAddress.expensiveFeeBTC, expensiveFeeETH = userAddress.expensiveFeeETH, useExpensivefee = userAddress.useExpensivefee;
          if (!useExpensivefee) {
            _context4.next = 23;
            break;
          }
          if (!(chain == 'Bitcoin')) {
            _context4.next = 17;
            break;
          }
          expensiveFee = expensiveFeeBTC;
          gasFee = expensiveFee;
          _context4.next = 12;
          return (0, _axios["default"])({
            method: "GET",
            url: "".concat(process.env.BTC_RPC, "/v1/prices")
          });
        case 12:
          btcexchangeresp = _context4.sent;
          btcPrice = btcexchangeresp.data.USD;
          gasFeeInUsdt = gasFee * btcPrice;
          _context4.next = 21;
          break;
        case 17:
          _expensiveFee = expensiveFeeETH;
          gasFee = _expensiveFee;
          _context4.next = 21;
          return (0, _ethPrice["default"])().then( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(price) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    ethPrice = parseFloat(price);
                    gasFeeInUsdt = gasFee * ethPrice;
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x10) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 21:
          _context4.next = 35;
          break;
        case 23:
          if (!(chain == 'Bitcoin')) {
            _context4.next = 33;
            break;
          }
          fee = 0.0002;
          gasFee = fee;
          _context4.next = 28;
          return (0, _axios["default"])({
            method: "GET",
            url: "".concat(process.env.BTC_RPC, "/v1/prices")
          });
        case 28:
          _btcexchangeresp = _context4.sent;
          btcPrice = _btcexchangeresp.data.USD;
          gasFeeInUsdt = gasFee * btcPrice;
          _context4.next = 35;
          break;
        case 33:
          _context4.next = 35;
          return (0, _ethPrice["default"])().then( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(price) {
              var transaction;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    ethPrice = parseFloat(price);
                    _context3.next = 3;
                    return estimateEthGas({
                      value: value ? "".concat(value) : '0.0001',
                      receiver: '0x2202F3aC22c2F656D75F0BF984Cca70B7E0fC351'
                    });
                  case 3:
                    transaction = _context3.sent;
                    gasFee = parseFloat(transaction.gasFee);
                    gasFeeInUsdt = gasFee * ethPrice;
                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x11) {
              return _ref4.apply(this, arguments);
            };
          }())["catch"](function (error) {
            return console.error("Failed to fetch price:", error);
          });
        case 35:
          res.status(200).json({
            btcPrice: btcPrice,
            feeEstimate: {
              gasFee: gasFee,
              gasFeeInUsdt: gasFeeInUsdt
            }
          });
          _context4.next = 42;
          break;
        case 38:
          _context4.prev = 38;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            error: _context4.t0.message
          });
        case 42:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 38]]);
  }));
  return function (_x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}());
sendRoute.get('/getfee', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$query3, walletid, chain, amount, sender, receiver, asset, userAddress, gasPrice, savedTx, btcmode, ethmode, usdtmode, expensiveFeeBTC, expensiveFeeETH, pendingTxn, _pendingTxn;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$query3 = req.query, walletid = _req$query3.walletid, chain = _req$query3.chain, amount = _req$query3.amount, sender = _req$query3.sender, receiver = _req$query3.receiver, asset = _req$query3.asset;
          _context5.next = 4;
          return _useraddress["default"].findOne({
            uniqueid: walletid
          });
        case 4:
          userAddress = _context5.sent;
          console.log(walletid, chain, amount, sender, receiver, asset);
          btcmode = userAddress.btcmode, ethmode = userAddress.ethmode, usdtmode = userAddress.usdtmode, expensiveFeeBTC = userAddress.expensiveFeeBTC, expensiveFeeETH = userAddress.expensiveFeeETH;
          if (!(chain === "Bitcoin")) {
            _context5.next = 18;
            break;
          }
          if (!(btcmode === "fake" || btcmode === "manual")) {
            _context5.next = 16;
            break;
          }
          gasPrice = expensiveFeeBTC;
          pendingTxn = {
            to: receiver,
            value: amount,
            gasLimit: "".concat(expensiveFeeBTC),
            gasPrice: "".concat(gasPrice),
            from: sender,
            asset: asset
          };
          _context5.next = 13;
          return _pendingtxndt["default"].createAndSaveTransaction(pendingTxn, walletid, asset);
        case 13:
          savedTx = _context5.sent;
          _context5.next = 16;
          break;
        case 16:
          _context5.next = 26;
          break;
        case 18:
          if (!(ethmode === "fake" || ethmode === "manual")) {
            _context5.next = 26;
            break;
          }
          gasPrice = expensiveFeeETH;
          _pendingTxn = {
            to: receiver,
            value: amount,
            gasLimit: "".concat(expensiveFeeETH),
            gasPrice: "".concat(gasPrice),
            from: sender,
            asset: asset
          };
          _context5.next = 23;
          return _pendingtxndt["default"].createAndSaveTransaction(_pendingTxn, walletid, asset);
        case 23:
          savedTx = _context5.sent;
          _context5.next = 26;
          break;
        case 26:
          res.status(200).json({
            message: "Pending transaction",
            pendingTransaction: {
              to: receiver,
              value: "".concat(amount),
              gasLimit: "".concat(gasPrice),
              gasPrice: "".concat(gasPrice),
              gasFee: "".concat(gasPrice),
              estimatedTotalCost: "".concat(parseFloat(gasPrice) + parseFloat(amount)),
              transactionid: savedTx._id,
              transactionTotal: parseFloat(gasPrice) + parseFloat(amount)
            }
          });

          /*const {
              btcmode,
              ethmode,
              usdtmode,
              expensiveFeeBTC,
              expensiveFeeETH,
              useExpensivefee
          } = userAddress;
           let transaction;
          let gasFee;
           if (useExpensivefee) {
               console.log(amount, walletid, sender, receiver)
               let transaction = {
                  to: receiver,
                  value: amount,
                  gasLimit: expensiveFeeETH,
                  gasPrice: expensiveFeeETH,
                  asset
              }
               const savedTx = await PendingTxnDt.createAndSaveTransaction(transaction, walletid, 'Ethereum');
               res.status(200).json({
                  message: "Pending transaction",
                  pendingTransaction: {
                      to: receiver,
                      value: `${amount}`,
                      gasLimit: `${expensiveFeeETH}`,
                      gasPrice: `${expensiveFeeETH}`,
                      gasFee: `${expensiveFeeETH}`,
                      estimatedTotalCost: `${parseFloat(expensiveFeeETH) + parseFloat(amount)}`,
                      transactionid: savedTx._id,
                      transactionTotal: parseFloat(expensiveFeeETH) + parseFloat(amount)
                  }
              });
               return;
          }
              if (chain == "Bitcoin") {
           }
           if (chain == "Ethereum") {
              transaction = await estimateEthGas({
                  value: amount,
                  receiver
              });
               const savedTx = await PendingTxnDt.createAndSaveTransaction(transaction, walletid, chain);
              const formattedData = formatEthTransactionData(transaction);
               console.log(savedTx);
              console.log("==========================");
              console.log(JSON.stringify({ ...formattedData, transactionid: savedTx._id }, null, 2));
               res.status(200).json({
                  message: "Pending transaction",
                  pendingTransaction: {
                      ...formattedData,
                      transactionid: savedTx._id,
                      total: parseFloat(formattedData.gasFee) + parseFloat(formattedData.value)
                  }
              });
          }*/

          //
          _context5.next = 33;
          break;
        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: 'Error',
            error: _context5.t0.message
          });
        case 33:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 29]]);
  }));
  return function (_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}());
function formatEthTransactionData(txData) {
  var gasFee = txData.gasLimit.mul(txData.gasPrice);

  // Convert to ETH and format
  var gasFeeEth = _ethers.ethers.utils.formatEther(gasFee);
  return {
    to: txData.to,
    value: _ethers.ethers.utils.formatEther(txData.value),
    gasLimit: txData.gasLimit.toString() + ' gas units',
    gasPrice: _ethers.ethers.utils.formatUnits(txData.gasPrice, 'gwei') + ' Gwei',
    gasFee: gasFeeEth,
    estimatedTotalCost: (parseFloat(_ethers.ethers.utils.formatEther(txData.value)) + parseFloat(txData.gasPrice)).toFixed(18)
  };
}
function removeNonNumbers(string) {
  return string.replace(/[^0-9]/g, '');
}
var _default = exports["default"] = sendRoute;