var util = require('util');
var resourceMgr = require('./resourceMgr');

var resMgr = null;

function initResourceMgr() {
  if (resMgr == null)
    resMgr = resourceMgr.getResMgr();
  resMgr.on('hardResource', function(rst_) {
    console.log('chag====>' + JSON.stringify(rst_));
    console.log('TIME--->' + new Date().getTime());
  });
}
exports.initResourceMgr = initResourceMgr;

function getResourceList(callback, IP, typeParam) {
  var args = {};
  //type.push('output');
  //type.push('vga');
  args['type'] = typeParam;
  args['desc'] = {};
  args['desc']['IP'] = IP;
  resMgr.getResourceList(callback, args);
}
exports.getResourceList = getResourceList;

function applyResource(callback, agrsObj) {
  resMgr.applyResource(function(err, ret_) {
    console.log("APPLY====================> " + err + "   " + JSON.stringify(ret_) + '  APPLY TIME--->' + new Date().getTime());
  }, agrsObj);
}
exports.applyResource = applyResource;


function applyResource(callback, agrsObj) {
  resMgr.releaseResource(function(err, ret_) {
    console.log("RELEASE====================> " + err + "   " + JSON.stringify(ret_) + '  RELEASE TIME--->' + new Date().getTime());
  }, agrsObj);
}
// resMgr.getResourceList(function(err, ret_) {
//   console.log("-------------->>>>>>>> " + JSON.stringify(ret_));
//   console.log(util.inspect(ret_, {
//     colors: true,
//     depth: 10
//   }));
//   var agrsObj = {};
//   agrsObj['desc'] = {};
//   agrsObj['type'] = ['hardResource'];
//   var detail = [];
//   var typeItem = {};
//   var type = [];
//   type.push('input');
//   type.push('camera');
//   typeItem['type'] = type;
//   typeItem['option'] = 0;
//   detail.push(typeItem);
//   typeItem = {};
//   type = [];
//   type.push('output');
//   type.push('audio');
//   typeItem['type'] = type;
//   typeItem['option'] = 0;
//   detail.push(typeItem);
//   typeItem = {};
//   type = [];
//   type.push('output');
//   type.push('video');
//   typeItem['type'] = type;
//   typeItem['option'] = 0;
//   detail.push(typeItem);
//   agrsObj['detail'] = detail;
//   agrsObj['desc'] = {};
//   agrsObj['other'] = 0;
//   agrsObj['desc']['IP'] = '127.0.0.1';

// }, args);

// initResourceMgr();
// getResourceList(function(err_, ret_) {
//   console.log('error:'+err_+'  '+JSON.stringify(ret_));
// },'127.0.0.1',['hardResource']);