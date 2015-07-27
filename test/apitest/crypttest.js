function APIcall(callback) {
  callback();
}

function example(){
  var p=document.getElementById("inputDiv");
  //API function call here.
 APIcall(function(){
  p.innerHTML = "Hi this is example DEMO.";
 });
}

var cryptedmsg=null;

function cipher(){
  var p=document.getElementById("inputDiv");
   WDC.requireAPI(['crypt'], function(data){
     data.cipher(function(msg){
        p.innerHTML="des encrypted: "+msg;
        cryptedmsg = msg;
     },'key123456','Hi there ~~~!');
   });
}

function decipher(){
  var p=document.getElementById("inputDiv");
  WDC.requireAPI(['crypt'], function(data){
     data.decipher(function(msg){
        p.innerHTML="des encrypted: "+msg;
     },'key123456',cryptedmsg);
   });
}