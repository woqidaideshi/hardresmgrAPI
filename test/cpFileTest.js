var //api = require('api'),
  cp = require("../lib/clipboard/clipboard"),
  dstPath = "/home/zk/test.txt";

  cp.setFile("/home/zk/file.txt", function(err){
    if( !err){
      cp.getFile(dstPath,function(){});
    }
  });
  