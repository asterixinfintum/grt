"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require('dotenv').config();
var _require = require("bitcore-lib"),
  PrivateKey = _require.PrivateKey;
var _require2 = require("bitcore-lib/lib/networks"),
  mainnet = _require2.mainnet;
var Mnemonic = require("bitcore-mnemonic");

/*const createHDWallet = (network = "mainet") => {
    let passPhrase = new Mnemonic(Mnemonic.Words.ENGLISH);
    let xpriv = passPhrase.toHDPrivateKey(passPhrase.toString(), network);

    return {
        xpub: xpriv.xpubkey,
        privateKey: xpriv.privateKey.toString(),
        address: xpriv.publicKey.toAddress().toString(),
        mnemonic: passPhrase.toString()
    };
}

/*{
  xpub: 'xpub661MyMwAqRbcGPu7fsoR9ZaL6Jr7EVTjrTTcXVVsmfZRJTDhZzy7fT7kY9fXuvk6ybwkVsYvEf2HAn9sDygEhrwUKFCspPU6piB4kdsBkx4',
  privateKey: '458254442e4c827e0151f8d3ea8eb10ece38ad383d044e460dbfb05ff103313a',
  address: '12a2txnk9ZUsHUAo1vrDvYfoZ9WQAYtYXr',
  mnemonic: 'jar evolve spread art robust post general length shrug like try strike'
}*/

var createWallet = function createWallet() {
  var network = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mainnet;
  try {
    var passPhrase = new Mnemonic(Mnemonic.Words.ENGLISH);
    var privateKey = new PrivateKey();
    var address = privateKey.toAddress(network);
    return {
      privateKey: privateKey.toString(),
      address: address.toString(),
      mnemonic: passPhrase.toString()
    };
  } catch (error) {
    console.log(error);
  }
};
var _default = exports["default"] = createWallet; //act erupt occur ranch twist pet tomorrow pluck host canvas bind either
//1Da39tPK5sdT9cnoE4vJHaFFbZCTXbKPcj
//spatial, crew, adapt, tell, spoil, warrior, fashion, upon, girl, solve, play, simple