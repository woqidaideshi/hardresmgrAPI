exports.app = function() {
  return require('./lib/app/app');
}

exports.app_remote = function() {
  return require('./lib/app/app_remote');
}

exports.data = function() {
  return require('./lib/datamgr/data');
  //return require('../../app/demo-rio/nodewebkit').requireDataHandle();
}

exports.resourceMgr = function() {
  //return require('./lib/resourcemgr/resourceMgr');
  return require('./lib/resourcemgr/res');
}

exports.im = function() {
  return require('./lib/im/im');
}

exports.im_remote = function() {
  return require('./lib/im/im_remote');
}

exports.lang = function() {
  return require('./lib/language/lang');
}

exports.devDetect = function() {
  return require('./lib/device_detect/device_service');
}

exports.devDetect_remote = function() {
  return require('./lib/device_detect/device_service_remote');
}

exports.clipboard = function() {
  return require('./lib/clipboard/clipboard');
}

exports.clipboard_remote = function() {
  return require('./lib/clipboard/clipboard_remote');
}

exports.crypt = function() {
  return require('./lib/crypt/crypt');
}