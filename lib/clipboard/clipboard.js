var netIface = require("os").networkInterfaces(),
  requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  dataTransProxy = requireProxy("datatransfer"),
  clipboardProxy = requireProxy("clipboard");


/* @method getString
 *  get the string data from clipboard
 */
exports.getText = function(callback) {
  clipboardProxy.paste(function(ret) {
    if (ret.err) {
      console.log("Error: " + ret.err);
      callback(ret.err);
    } else {
      var txt = ret.ret;
      callback(txt);
    }

  });
}

/* @method getFile
 *  @para dstPath:detination to store file
 *     e.g:[dstIP:]path_to_destination_file
 *  get file by using the path on the clipboard
 */
exports.getFile = function(dstPath, callback) {
  clipboardProxy.paste(function(ret) {
    if (ret.err) {
      console.log("Error: " + ret.err);
      callback(ret.err)
    } else {
      var srcPath = "";
      if(ret.ip == "")
        srcPath = ret.ret;
      else 
        srcPath = ret.ip + ":" +ret.ret;
      dataTransProxy.cpFile(srcPath,dstPath,callback);
    }
  });
}

/* @method setText
 *  copy string to clipboard
 *  @para data: string,file
 *  @para callback: function to handle the reslut of doCopy()
 */
exports.setText = function(string, callback) {
  clipboardProxy.copy(string, function(err) {
    if (err.err) {
      callback(err.err);
    } else {
      callback({});
    }
  });
}

/* @method setFile
 *  copy directory of a file to clipboard
 *  @para path: directory of source file
 */
exports.setFile = function(path, callback) {
  clipboardProxy.copy(path, function(err) {
    var _err = err.err;
    if (_err) {
      console.log("Error: " + _err);
      callback(_err);
    } else {
      callback({});
    }
  });
}