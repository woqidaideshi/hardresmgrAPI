var fsPublic = require('./fsPublic');
var fs = require('fs');
var fileTransfer = require('./fileTransfer');
var util = require('util');
var config = require('systemconfig');
var path = require('path');
var cp = require("child_process");

var RATIO_SIZE = 0.1;

function deleteTmpFile(tmpFilePath,callback){
  try{
    if(fs.existsSync(tmpFilePath)){
      fs.unlinkSync(tmpFilePath);
      callback(false,'deleteTmpFile success');
    }else{
      callback(false,'deleteTmpFile no need to delete');
    }
  }catch(e){
    callback(true,'deleteTmpFile '+e);
  }
}
exports.deleteTmpFile = deleteTmpFile;

function transferFileProcess(msgObj, callback) {
  fsPublic.mkdirsSync(config.DOWNLOADPATH, function(done) {
    if (done) {
      transferFile(msgObj, callback);
    } else {
      setTimeout(callback(true, 'init transfer dir failed.....'), 0);
    }
  });
}
exports.transferFileProcess = transferFileProcess;

function initTransferFileName(fileName, callback) {
  var filePath = path.join(config.DOWNLOADPATH, fileName);
  var name;
  var suffix;
  var i = 1;
  while (fileExistOrNot(filePath)) {
    if (i === 1) {
      if (fileName.indexOf(".") >= 0) {
        var buf = fileName.split('.');
        name = fileName.substr(0, fileName.length - buf[buf.length - 1].length - 1);
        suffix = '.' + buf[buf.length - 1];
      } else {
        name = fileName;
        suffix = '';
      }
    }
    fileName =  name + ' (' + i + ')' + suffix;
    filePath = path.join(config.DOWNLOADPATH,fileName);
    i++;
  }
  callback(fileName,filePath);
}
exports.initTransferFileName = initTransferFileName;

function fileExistOrNot(filePath) {
  var exists = fs.existsSync(filePath);
  return exists;
}

function transferFile(msgObj, callback) {
  try {
    initTransferFileName(msgObj.fileName, function(fileName, output) {
      fileTransfer.transferFileInitInfo(msgObj, fileName, output, function(rstObj) {
        setTimeout(callback(false, rstObj), 0);
      });
    });
  } catch (e) {
    setTimeout(callback(true, 'on fileTransfering failed.....'), 0);
  }
}
exports.transferFile = transferFile;

function clearTmpDir() {
  try {
    var exists = fs.existsSync(config.DOWNLOADPATH);
    if (exists) {
      var files = fs.readdirSync(config.DOWNLOADPATH);
      files.forEach(function(item) {
        var tmpPath = config.DOWNLOADPATH + '/' + item;
        var sCommandStr = "rm -rf '" + tmpPath+"'";
        cp.exec(sCommandStr, function(err, stdout, stderr) {
          if (err) {
            console.log(err);
          } else {
            console.log('delete file ' + tmpPath);
          }
        });
      });
    } else {
      console.log('no DOWNLOAD dir');
    }
  } catch (e) {
    console.log('clearTmpDir error ' + e);
  }
}
exports.clearTmpDir = clearTmpDir;