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

function getRegisteredApp(){
   var p=document.getElementById("inputDiv");
   WDC.requireAPI(['app'], function(app){
     app.getRegisteredApp(function(err,appArr){
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = appArr;
     });
   });
}