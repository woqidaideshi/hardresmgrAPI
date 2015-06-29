var netIface = require("os").networkInterfaces(),
  requireProxy = require('../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  dataTransProxy = requireProxy("datatransfer"),
  clipboardProxy = requireProxy("clipboard");


/* @method getString
 *  get the string data from clipboard
 */
exports.getText(callback) {
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
 *  @para srcPath:path of source file
 *     e.g:[srcIP:]path_to_source_file
 *  get file by using the path on the clipboard
 */
exports.getFile(dstPath, callback) {
  clipboardProxy.paste(function(ret){
    if (ret.err) {
      console.log("Error: " + ret.err);
      callback(ret.err)
    }else{
      var srcPath = ret.ip + ":" + ret.ret;

      dataTransProxy.cpFile(srcPath,dstPath,callback);
      }
    }
  });
}

/* @method setText
 *  copy string to clipboard
 *  @para data: string,file
 *  @para callback: function to handle the reslut of doCopy()
 */
exports.setText(string, callback) {
  clipboardProxy.copy(string, function(err) {
    if (err.err) {
      console.log("Error: " + err.err);
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
exports.setFile(path, callback) {
  clipboardProxy.copy(string, function(err) {
    var _err = err.err;
    if (_err) {
      console.log("Error: " + _err);
      callback(_err);
    } else {
      callback({});
    }
  });
}