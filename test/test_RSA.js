var key = require('../lib/crypt/crypt.js');

key.EncryptRSA(function(msg) {
  console.log(msg);
  key.DecryptRSA(function(tt) {
    console.log(tt);
  }, msg);
}, "Hi there this is testing in rsa encryption");