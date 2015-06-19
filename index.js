exports.app = function() {
  return require('./lib/app');
}

exports.app_remote = function() {
  return require('./lib/app_remote');
}

exports.data = function() {
  // return require('./lib/data');
  return require('../../app/demo-rio/nodewebkit/lib/api/data.js')
}

exports.resourceMgr = function() {
  return require('./lib/resourceMgr');
}

exports.im = function(){
  return require('./lib/im');
}

exports.lang = function(){
  return require('./lib/lang');
}

