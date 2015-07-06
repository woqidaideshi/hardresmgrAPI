var //api = require('api'),
  cp = require("../lib/clipboard/clipboard"),
  dstPath = "/home/lgy/t1.iso";

  cp.setFile("/home/lgy/t.iso", function(err) {
    if(!err) {
      cp.getFile(dstPath, function(session, dstPath) {
        var id = session.id;
        session.session.on('progress#' + id, function(percentage, msg) {
          console.log('Progress:', percentage + '%', msg);
        }).on('error#' + id, function(err) {
          console.log('Error:', err);
        }).on('end#' + id, function(err) {
          if(err) return console.log(err);
          console.log('Transmission OK!');
        });
      });
    }
  });
  
