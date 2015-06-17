exports.app = function() {
  return require('./lib/app/app');
}

exports.app_remote = function() {
  return require('./lib/app/app_remote');
}

exports.data = function() {
  // return require('./lib/datamgr/data');
  return require('../../app/demo-rio/nodewebkit/lib/api/data.js')
}

exports.resourceMgr = function() {
  return require('./lib/resourcemgr/resourceMgr');
}

exports.im = function(){
  return require('./lib/im/im');
}

exports.lang = function(){
  return require('./lib/language/lang');
}

exports.devDetect = function() {
  return require('./lib/device_detect/device_service');
}

exports.devDetect_remote = function() {
  return require('./lib/device_detect/device_service_remote');
}

