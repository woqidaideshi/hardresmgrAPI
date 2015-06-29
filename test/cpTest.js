var 
  cp = require('../lib/clipboard/clipboard'),
  dstPath = "/home/zk/test.doc";


cp.getText(function(ret){
  console.log("Text of clipboard: " + ret);
});

cp.setText("dddddddddddddd",function(err){
  console.log("in setText");
  if(err){
    console.log("Error: " + err.err);
  }
});