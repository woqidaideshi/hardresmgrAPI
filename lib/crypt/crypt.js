var crypto = require('crypto');
var requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync;
var cryptdaemon = requireProxy('cryptdaemon');
var ursa = require('ursa');
var fs = require('fs');

var client_public = '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtt7uD+C9wIn+LHx2p4bW\n' +
    'RjugFp6AgU+bdQ7yQxOdF5jmp5K6HIKqfUaBOC8jhoPqprypofll6PmvUgs2wsxG\n' +
    'nRw4jfxtgQmBMHQ5OSKhmReo+cdHk0lwuySGaDJphS7JustfXKf0E+XmEZUZp+s2\n' +
    'V02eSN1js8xDfYab5alN6Jep6gGLPcBVSHCinFSfS+rbFgOsfEDY6Dv8jXXHHPZ4\n' +
    '8AGt8jwC2IDzWPDaO8uq3Qt18C8L/8ViDErhVYJmX4KPH7cpGPSAmJfiFBW9xNRW\n' +
    'z2115lDrggQB6CDk3ZGQlX2U6Mbo4kBzOBUf+bt5ICrb/7B3hgUyZhpEgZUZIcTz\n' +
    'fQIDAQAB\n' +
    '-----END PUBLIC KEY-----';

var client_private = '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEpAIBAAKCAQEAtt7uD+C9wIn+LHx2p4bWRjugFp6AgU+bdQ7yQxOdF5jmp5K6\n' +
    'HIKqfUaBOC8jhoPqprypofll6PmvUgs2wsxGnRw4jfxtgQmBMHQ5OSKhmReo+cdH\n' +
    'k0lwuySGaDJphS7JustfXKf0E+XmEZUZp+s2V02eSN1js8xDfYab5alN6Jep6gGL\n' +
    'PcBVSHCinFSfS+rbFgOsfEDY6Dv8jXXHHPZ48AGt8jwC2IDzWPDaO8uq3Qt18C8L\n' +
    '/8ViDErhVYJmX4KPH7cpGPSAmJfiFBW9xNRWz2115lDrggQB6CDk3ZGQlX2U6Mbo\n' +
    '4kBzOBUf+bt5ICrb/7B3hgUyZhpEgZUZIcTzfQIDAQABAoIBAQCtJuy28A/7jS20\n' +
    'Ja2b9ppRKgftIut+hUgnUJ2nUZz/SPGtXcsHT9nqgKW98zRqG+JFOoJMMf+C11hg\n' +
    'EOorDI0YGi6akpeFBODkZkgAh4AHm1WOHFjzZyhsqqrxYjpzttegHQ0QiJ8dcCOm\n' +
    'Jk2Cp75ub7oeODI9fn2xD5HxpZt1TPq5e+TSxBWXAx1i1S56PJJdVFjVWCPrVPiE\n' +
    'jxcOncwfmcZWNV1F9qkXI8wH6yh4LZ70zppc5KnI0WtO0RghUorCIUZ99I60IaBl\n' +
    's0OAmK/qBF+zZLv/FAwyr/cAHiy61d7iPp1Vw5DkcWZuLOgqTx5MHnf5SnL9ur3O\n' +
    '9B1UHmCpAoGBAOor7PPbpOPgDU0B46iXZfwkAp07k7sNaip63nRSL6Lm3IBUcKaz\n' +
    'hVHLPZpZwvs65XxS1N5sz5z+zOTicX2iRlTUsdQuymHEACbIRFwCwuNAwFGEsJ2r\n' +
    'gCzLjp5mb3d5j3UA3+Wx1viZncdqZfvcojeIr1CTdGf/PZqeKom5GzSrAoGBAMfq\n' +
    'zk8gqFEop8P5unLodDfXOAa49jbVFOJlEYl4zPrco/HnpBaAZyb0XLnbWqPz8F1K\n' +
    'sENK3i18eEBR+nZ80WDlaT9M8q4YiY3vhEfb8TA4ENBa+WQsgWSoSGgLzQlJunNW\n' +
    'mSaRO3xieQzeO0h6WOiakAg/OyMZFx1gjKS2Lmh3AoGBAL1am5Zs656gU+ELQA3Z\n' +
    'rsv+SmbeAA1nQYvsIumoc4CkcXUL0rPZwlprn/qpzrLb4yluyVa6Yf8vQntqaB8R\n' +
    'ExIRk2JiG6CGnyC9HBnS2chtWZYRV8eHIHQYfdC0QDo5/7i65lGURqJrhVv1O1Y4\n' +
    'CKwjSLA9LAnUKPpYH0mSdt9VAoGAbyunpmDmuJr/D//jKtsRJaxMv5BDeqJrhqnl\n' +
    'YqkGc8oWcQL7QHgO5J6mocPVV67jTz2lXwZXHrxEsp/jw9gNJvDr4gOMQDvs4jz7\n' +
    'NmqcaNAEqZitboNBQRRDj3hggHW7dUAG0meYyMaJwhoipV9D6bVpuuxOmmntbKyw\n' +
    'CTg1/mkCgYA8lSvFXCwtsBI84fSn8MmVFCRutXWYrk3O53kMcuUqbkfxiuQj+U2/\n' +
    '3X60XQXIi2qk7Ti3GU8jl22WCR6ChknOXjAuHsc9HmR0uasyy1BNaC9vx+xcPRk/\n' +
    'aqAJsIhfHajMjKg+5UJ0zH5G0mJUR93spnVvf9Tsf1Z48UCdjKCNTw==\n' +
    '-----END RSA PRIVATE KEY-----';


var server_public = '-----BEGIN PUBLIC KEY-----\n' +
    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALFSzfjrIl8Vj0dbUVTvVEXnGMOL3O6I\n' +
    'OWsK0EJcEk18BktuaIGC0gWb8f9MpL3cqouRaDuS2JM+xIZrocyA5YECAwEAAQ==\n' +
    '-----END PUBLIC KEY-----';


var server_private = '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIBPQIBAAJBALFSzfjrIl8Vj0dbUVTvVEXnGMOL3O6IOWsK0EJcEk18BktuaIGC\n' +
    '0gWb8f9MpL3cqouRaDuS2JM+xIZrocyA5YECAwEAAQJBAJzBNaIZws3JklqjSFfM\n' +
    'JnSRIZwkNQ+Mzy1oZshy+h8RznAxD0yQRgHvlU+cUhjLr4znQpyVSZ5686Ay9LI1\n' +
    'eVECIQDhrcCUzOKsVhEjlotfDpBHixWdJNzt62UcLwdXthW/dQIhAMkl3fDGE7wR\n' +
    'ZIjRSVOgGU8VgR67WV14DNXD8cqVffhdAiEAkVu8wxsElUQKXgXFV0CmJa6sCT+J\n' +
    'HaWUxoZ0EEaz01ECIQC++sUOpgJ2vczGWm9Uht2AyNofY6IlrKYDEFeyEN3ZwQIh\n' +
    'AJ+UaCEDeiFRwSxFYnCpkhTU1ZUVrzo4HaZuAt780KBD\n' +
    '-----END RSA PRIVATE KEY-----';

  var server = {
    pem: ursa.createPrivateKey(server_private),
    pub: ursa.createPublicKey(server_public)
};

var client = {
    pub: ursa.createPublicKey(client_public),
    pem: ursa.createPrivateKey(client_private)
};

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

exports.getsymkey = function(callback,IP){
  cryptdaemon.getsymkey(IP,function(res){
    callback(res.ret);
  });
}

exports.EncryptRSA = function(callback, msg, pkeypath) {
    this.key = null;
    this.pub = null;
    this.enmsg = null;
    var self = this;
    if (pkeypath !== undefined) {
        try {
            self.key = fs.readFileSync(pkeypath);
            self.pub = ursa.createPublicKey(self.key);
        } catch (e) {
            if (e.code == 'ENOENT') {
                console.log("Pubkey not found");
            } else {
                console.log(e);
            }
        }
    } else {
        self.pub = client.pub;
    }
    if (ursa.isPublicKey(self.pub)) {
        try {
            self.enmsg = self.pub.encrypt(msg, 'utf8', 'base64');
            callback(self.enmsg);
        } catch (e) {
            console.log(e);
            callback(null);
        }
    } else {
        console.log("wrong Pubkey object");
        callback(null);
    }
}

exports.DecryptRSA = function(callback, msg, rkeypath) {
    this.key = null;
    this.pri = null;
    this.demsg = null;
    var self = this;
    if (rkeypath !== undefined) {
        try {
            self.key = fs.readFileSync(rkeypath);
            self.pri = ursa.createPrivateKey(self.key);
        } catch (e) {
            if (e.code == 'ENOENT') {
                console.log("Private key not found");
            } else {
                console.log(e);
            }
        }
    } else {
        self.pri = client.pem;
    }
    if (ursa.isPrivateKey(self.pri)) {
        try {
            self.demsg = self.pri.decrypt(msg, 'base64', 'utf8');
            callback(self.demsg);
        } catch (e) {
            console.log(e);
            callback(null);
        }
    } else {
        console.log("wrong Private key object");
        callback(null);
    }
}