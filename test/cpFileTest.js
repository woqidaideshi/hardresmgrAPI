var api = require('api'),
  cp = api.clipboard(),
  dstPath = "/home/zk/test.doc";

  cp.setFile(dstPath, function(err){
    if(!err){
      cp.getFile(dstPath,function(){});
    }
  });
  