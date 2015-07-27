var crypt = require('../lib/crypt/crypt.js');

crypt.cipher(function(msg){
  console.log("Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("Decrypted msg:  "+de);
  },'key123456',msg);
},'key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("blowfish Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("blowfish Decrypted msg:  "+de);
  },'blowfish','key123456',msg);
},'blowfish','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("aes-256-cbc Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("aes-256-cbc Decrypted msg:  "+de);
  },'aes-256-cbc','key123456',msg);
},'aes-256-cbc','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("cast Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("cast Decrypted msg:  "+de);
  },'cast','key123456',msg);
},'cast','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("des3 Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("des3 Decrypted msg:  "+de);
  },'des3','key123456',msg);
},'des3','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("idea Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("idea Decrypted msg:  "+de);
  },'idea','key123456',msg);
},'idea','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("rc2 Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("rc2 Decrypted msg:  "+de);
  },'rc2','key123456',msg);
},'rc2','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("rc4 Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("rc4 Decrypted msg:  "+de);
  },'rc4','key123456',msg);
},'rc4','key123456','Hi there ~~~!')

crypt.cipher(function(msg){
  console.log("seed Encrypted msg:  "+msg);
  crypt.decipher(function(de){
    console.log("seed Decrypted msg:  "+de);
  },'seed','key123456',msg);
},'seed','key123456','Hi there ~~~!')
