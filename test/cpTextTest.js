var // api =require('api'),
  cp = require('../lib/clipboard/clipboard');


cp.getText(function(ret){
  console.log("Text of clipboard: " + ret);
});

cp.setText("dddddddddddddd",function(err){
  console.log("in setText");
  if(err){
    console.log("Error: " + err);
  }
});
