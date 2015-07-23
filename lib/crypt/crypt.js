var crypto = require('crypto');

//加密
exports.cipher = function() {
  var encrypted = "";
  var cip = null;
  if (arguments.length == 3) {
    cip = crypto.createCipher('des', arguments[0]);
    try {
      encrypted += cip.update(arguments[1], 'binary', 'hex');
      encrypted += cip.final('hex');
    } catch (e) {
      console.log("encrypt error!");
      console.log(e);
      arguments[2](null);
    }
    arguments[2](encrypted);
  } else if (arguments.length == 4) {
    cip = crypto.createCipher(arguments[0], arguments[1]);
    try {
      encrypted += cip.update(arguments[2], 'binary', 'hex');
      encrypted += cip.final('hex');
    } catch (e) {
      console.log("encrypt error!");
      console.log(e);
      arguments[3](null);
    }
    arguments[3](encrypted);
  } else {
    console.log("arguments error ! " + arguments);
  }
}

exports.decipher = function() {
  var decrypted = "";
  var decipher = null;
  if (arguments.length == 3) {
    decipher = crypto.createDecipher('des', arguments[0]);
    try {
      decrypted += decipher.update(arguments[1], 'hex', 'binary');
      decrypted += decipher.final('binary');
    } catch (e) {
      console.log("decrypt error, please check the key.");
      console.log(e);
      arguments[2](null);
    }
    arguments[2](decrypted);
  } else if (arguments.length == 4) {
    decipher = crypto.createDecipher(arguments[0], arguments[1]);
    try {
      decrypted += decipher.update(arguments[2], 'hex', 'binary');
      decrypted += decipher.final('binary');
    } catch (e) {
      console.log("decrypt error, please check the key.");
      console.log(e);
      arguments[3](null);
    }
    arguments[3](decrypted);
  } else {
    console.log("arguments error ! " + arguments);
  }
}