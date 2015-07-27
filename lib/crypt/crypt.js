var crypto = require('crypto');

//加密
exports.cipher = function() {
  var encrypted = "";
  var cip = null;
  if (arguments.length == 3) {
    cip = crypto.createCipher('des', arguments[1]);
    try {
      encrypted += cip.update(arguments[2], 'binary', 'hex');
      encrypted += cip.final('hex');
    } catch (e) {
      console.log("encrypt error!");
      console.log(e);
      arguments[0](null);
    }
    arguments[0](encrypted);
  } else if (arguments.length == 4) {
    cip = crypto.createCipher(arguments[1], arguments[2]);
    try {
      encrypted += cip.update(arguments[3], 'binary', 'hex');
      encrypted += cip.final('hex');
    } catch (e) {
      console.log("encrypt error!");
      console.log(e);
      arguments[0](null);
    }
    arguments[0](encrypted);
  } else {
    console.log("arguments error ! " + arguments);
  }
}

exports.decipher = function() {
  var decrypted = "";
  var decipher = null;
  if (arguments.length == 3) {
    decipher = crypto.createDecipher('des', arguments[1]);
    try {
      decrypted += decipher.update(arguments[2], 'hex', 'binary');
      decrypted += decipher.final('binary');
    } catch (e) {
      console.log("decrypt error, please check the key.");
      console.log(e);
      arguments[0](null);
    }
    arguments[0](decrypted);
  } else if (arguments.length == 4) {
    decipher = crypto.createDecipher(arguments[1], arguments[2]);
    try {
      decrypted += decipher.update(arguments[3], 'hex', 'binary');
      decrypted += decipher.final('binary');
    } catch (e) {
      console.log("decrypt error, please check the key.");
      console.log(e);
      arguments[0](null);
    }
    arguments[0](decrypted);
  } else {
    console.log("arguments error ! " + arguments);
  }
}