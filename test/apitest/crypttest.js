function APIcall(callback) {
  callback();
}

function example() {
  var p = document.getElementById("inputDiv");
  //API function call here.
  APIcall(function() {
    p.innerHTML = "Hi this is example DEMO.";
  });
}

var cryptedmsg = null;
var rsamsg = null;

function cipher() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['crypt'], function(data) {
    data.cipher(function(msg) {
      p.innerHTML = "des encrypted: " + msg;
      cryptedmsg = msg;
    }, 'key123456', 'Hi there ~~~!');
  });
}

function decipher() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['crypt'], function(data) {
    if (cryptedmsg !== null) {
      data.decipher(function(msg) {
        p.innerHTML = "des encrypted: " + msg;
      }, 'key123456', cryptedmsg);
    }else{
      p.innerHTML = "Please click cipher function first .";
    }
  });
}

function getsymkey() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['crypt'], function(data) {
    data.getsymkey(function(msg) {
      p.innerHTML = "get key : " + msg;
    }, "192.168.131.123");
  });
}

function EncryptRSA() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['crypt'], function(data) {
    data.EncryptRSA(function(msg) {
      p.innerHTML = "RSA encrypted : " + msg;
      rsamsg = msg;
    }, "This is the test for RSA encryption");
  });
}

function DecryptRSA() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['crypt'], function(data) {
    if (rsamsg !== null) {
      data.DecryptRSA(function(msg) {
        p.innerHTML = "RSA decrypted : " + msg;
      }, rsamsg);
    } else {
      p.innerHTML = "Please click EncryptRSA function first ."
    }
  });
}