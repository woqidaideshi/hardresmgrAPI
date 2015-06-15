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

function getAllContacts() {
   var p=document.getElementById("inputDiv");
}

function loadResources(){
  example1();
}