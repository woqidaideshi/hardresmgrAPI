var netIface = require("os").networkInterfaces(),
  requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  dataTransProxy = requireProxy("datatransfer"),
  clipboardProxy = requireProxy("clipboard"),
  router = requireProxy('httpserver');

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
exports.getFile = function(callback, dstPath) {
  clipboardProxy.paste(function(ret) {
    if (ret.err) {
      console.log("Error: " + ret.err);
      callback(ret.err);
      return;
    } else {
      var srcPath = "",
        _dstPath = dstPath;
      if (!ret.ret) {
        ret.err = "ret.ret is null";
        callback(ret.err);
        return;
      }
      try {
        ret.ret = ret.ret.split("path:")[1];
      } catch (e) {
        console.log(e);
        callback(e);
        return;
      }
      if (!ret.ret) {
        ret.err = "path not in ret.ret ";
        callback(ret.err);
        return;
      }

      console.log(ret.ret);
      srcPath = ((ret.ip == '') ? ret.ret : (ret.ip + ':' + ret.ret));
      if (_dstPath[_dstPath.length - 1] == '/') {
        var subString = ret.ret.split('/');
        _dstPath = dstPath + subString[subString.length - 1];
      }

      dataTransProxy.cpFile(srcPath, _dstPath, function(ret) {
        console.log("srcPath=" + srcPath + ",_dstPath=" + _dstPath);
        if (ret.err) {
          return callback(ret.err);
        }
        var sessionId = ret.ret;
        callback(null, sessionId, _dstPath);
      });
    }
  });
}

var _exports = module.exports;
exports.monitorDataTransfer = function(callback, sessionId) {
  dataTransProxy.on('progress#' + sessionId, function(percentage, msg) {
    callback(null, percentage, msg);
    var progressCb = {
      'error': null,
      'percentage': percentage,
      'msg': msg
    };
    try {
      _exports.wsNotify({
        'Action': 'notify',
        'Event': 'datatrans',
        'Data': progressCb
      });
    } catch (e) {
      console.log(e);
    }
  }).on('error#' + sessionId, function(err) {
    callback(err);
    var errorCb = {
      'error': err
    };
    _exports.wsNotify({
      'Action': 'notify',
      'Event': 'datatrans',
      'Data': errorCb
    });
  }).on('end#' + sessionId, function(err) {
    if (err) {
      callback(err);
      var errorCb = {
        'error': err
      };
      _exports.wsNotify({
        'Action': 'notify',
        'Event': 'datatrans',
        'Data': errorCb
      });
    } else {
      callback(null, 100, 'finished');
      var finishCb = {
        'error': null,
        'percentage': 100,
        'msg': 'finished'
      };
      _exports.wsNotify({
        'Action': 'notify',
        'Event': 'datatrans',
        'Data': finishCb
      });
    }
  });
}

exports.dataTransProgress = function(callback, err, percentage, msg) {
  callback(err, percentage, msg);
}

/* @method setText
 *  copy string to clipboard
 *  @para data: string,file
 *  @para callback: function to handle the reslut of doCopy()
 */
exports.setText = function(callback, string) {
  if (typeof(callback) != 'function') {
    throw "setText: the first parameter must be function";
  }
  var _text = "text:" + string;
  clipboardProxy.copy(_text, function(err) {
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
exports.setFile = function(callback, path) {
  if (typeof(callback) != 'function') {
    throw "setFile: the first parameter must be function";
  }
  var _path = "path:" + path;
  clipboardProxy.copy(_path, function(err) {
    var _err = err.err;
    if (_err) {
      console.log("Error: " + _err);
      callback(_err);
    } else {
      callback(null);
    }
  });
}