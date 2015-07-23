var crypt = require('../lib/crypt/crypt.js');

crypt.cipher('key123456','Hi there ~~~!',function(msg){
  console.log("Encrypted msg:  "+msg);
  crypt.decipher('key123456',msg,function(de){
    console.log("Decrypted msg:  "+de);
  });
})

crypt.cipher('blowfish','key123456','Hi there ~~~!',function(msg){
  console.log("blowfish Encrypted msg:  "+msg);
  crypt.decipher('blowfish','key123456',msg,function(de){
    console.log("blowfish Decrypted msg:  "+de);
  });
})

crypt.cipher('aes-256-cbc','key123456','Hi there ~~~!',function(msg){
  console.log("aes-256-cbc Encrypted msg:  "+msg);
  crypt.decipher('aes-256-cbc','key123456',msg,function(de){
    console.log("aes-256-cbc Decrypted msg:  "+de);
  });
})

crypt.cipher('cast','key123456','Hi there ~~~!',function(msg){
  console.log("cast Encrypted msg:  "+msg);
  crypt.decipher('cast','key123456',msg,function(de){
    console.log("cast Decrypted msg:  "+de);
  });
})

crypt.cipher('des3','key123456','Hi there ~~~!',function(msg){
  console.log("des3 Encrypted msg:  "+msg);
  crypt.decipher('des3','key123456',msg,function(de){
    console.log("des3 Decrypted msg:  "+de);
  });
})

crypt.cipher('idea','key123456','Hi there ~~~!',function(msg){
  console.log("idea Encrypted msg:  "+msg);
  crypt.decipher('idea','key123456',msg,function(de){
    console.log("idea Decrypted msg:  "+de);
  });
})

crypt.cipher('rc2','key123456','Hi there ~~~!',function(msg){
  console.log("rc2 Encrypted msg:  "+msg);
  crypt.decipher('rc2','key123456',msg,function(de){
    console.log("rc2 Decrypted msg:  "+de);
  });
})

crypt.cipher('rc4','key123456','Hi there ~~~!',function(msg){
  console.log("rc4 Encrypted msg:  "+msg);
  crypt.decipher('rc4','key123456',msg,function(de){
    console.log("rc4 Decrypted msg:  "+de);
  });
})

crypt.cipher('seed','key123456','Hi there ~~~!',function(msg){
  console.log("seed Encrypted msg:  "+msg);
  crypt.decipher('seed','key123456',msg,function(de){
    console.log("seed Decrypted msg:  "+de);
  });
})