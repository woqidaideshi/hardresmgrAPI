var net = require('net');
var fs = require('fs');
var os = require('os');
var config = require('systemconfig');

var TIMEOUT = 10000;

function getFileSize(num) {
  var type = 'byte';
  var i = 0;
  while (num > 1000) {
    num /= 1000;
    i++;
  }
  switch (i) {
    case 0:
      type = 'B';
      break;
    case 1:
      type = 'KB';
      break;
    case 2:
      type = 'MB';
      break;
    case 3:
      type = 'GB';
      break;
    case 4:
      type = 'TB';
      break;
    case 5:
      type = 'PB';
      break;
    case 6:
      type = 'EB';
      break;
    case 7:
      type = 'ZB';
      break;
    case 8:
      type = 'YB';
      break;
    default:
      type = 'byte';
  }
  if (num - num.toFixed(2) === 0)
    return num + ' ' + type;
  else return num.toFixed(1) + ' ' + type;
}

function fileTransferInit(path, fileTransferInitCb) {
  if (!fs.existsSync(path)) {
    fileTransferInitCb(true, 'no such a file');
    return false;
  } else {
    var file = fs.statSync(path);
    if (!file || !file.isFile()) {
      fileTransferInitCb(true, 'file stat error');
      return false;
    } else {
      size = file.size;
      if (size === 0) {
        fileTransferInitCb(true, 0);
      } else {
        var buf = path.split('/');
        var name = buf[buf.length - 1];
        fileTransferRequest(name, size,path, fileTransferInitCb);
      }
    }
  }
}
exports.fileTransferInit=fileTransferInit;

//发送端发送文件请求  0x0000
function fileTransferRequest( name, length, path,callback) {
  var msg = {};
  msg['type'] = 'file'; 
  msg['option'] = 0x0000;
  msg['fileName'] = name;
  msg['srcPath']=path;
  msg['fileSize'] = getFileSize(length);
  msg['fileLength'] = length;
  msg['msg'] = 'file-transfer do you want to accept ' + name;
  callback(false,msg);
}

function transferFileInitInfo(msgObj,fileName, filePath, callback) {
  var msg = msgObj;
  msg['state'] = 1;
  msg['fileNameLocal']=fileName;
  msg['filePath']=filePath;
  msg['msg'] = 'file-transfer transferRatio of file init opertion is ok' + msgObj.key;
  callback(msg);
}
exports.transferFileInitInfo = transferFileInitInfo;

function transferFileCancelSender(msgObj, state,callback) {
  var msg = msgObj;
  msg['option'] = 0x0001;
  msg['state']=state;
  callback(msg);
}
exports.transferFileCancelSender = transferFileCancelSender;

function transferCancelReciever(msgObj,callback) {
  var msg = msgObj;
  msg['option'] = 0x0011;
  callback(msg);
}
exports.transferCancelReciever = transferCancelReciever;
