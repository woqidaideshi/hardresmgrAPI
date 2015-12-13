var util = require('util'),
  utils = require('utils'),
  flowctl = utils.Flowctl(),
  resourceMgr = require('./resourceMgr');

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
  if (IP===undefined||typeParam.length > 1) {//默认获取所有大类资源时分大类下的小类获取
    getResourceByCate(callback, args);
  }else{
    getResourceOneByOne(callback, args);
  }
  //getResourceByCate(callback, args);
}
exports.getResourceList = getResourceList;

function getResourceByCate(callback, args) {
  resMgr.getResourceList(function(err_, ret_) {
    if (err_) {
      console.log('get resource error :' + JSON.stringify(args) + ' now ger list one by one');
      getResourceOneByOne(callback, args);
    } else callback(err_, ret_);
  }, args);
}

function getResourceOneByOne(callback, args) {
  resMgr.getChildCate(function(err_, rst_) {
    if (err_) {
      console.log('depart request error ' + err_);
      callback(err_, rst_);
    } else {
      var rstS = {};
      var func = function(parseSet, funcCb) {
        resMgr.getResourceList(function(err_, ret_) {
          if (err_) console.log('error: ' + err_ + '   ' + ret_);
          else {
            rstS[parseSet['type'][parseSet['type'].length - 1]] = ret_;
          }
          funcCb();
        }, parseSet);
      }
      var parsesSet = [];
      for (var key in rst_['detail']) {
        var paramItem = {};
        var typeItem = [];
        for (var val in args['type']) {
          typeItem.push(args['type'][val]);
        }
        typeItem.push(rst_['detail'][key]);
        paramItem['type'] = typeItem;
        paramItem['desc'] = {};
        paramItem['desc']['IP'] = args['desc']['IP'];
        parsesSet.push(paramItem);
      }
      console.log('parsesSet: ' + JSON.stringify(parsesSet))
      flowctl.parallel1(parsesSet, func, function(err_, rets_) {
        if (err_) {
          console.log('parallel1 error: ' + err_ + '  ' + rets_)
          callback(err_, rets_);
        } else {
          rst_['detail'] = rstS;
          callback(err_, rst_);
        }
      });
    }
  }, args);
}

function applyResource(callback, agrsObj) {
  resMgr.applyResource(function(err, ret_) {
    console.log("APPLY====================> " + err + "   " + JSON.stringify(ret_) + '  APPLY TIME--->' + new Date().getTime());
  }, agrsObj);
}
exports.applyResource = applyResource;


function releaseResource(callback, agrsObj) {
  resMgr.releaseResource(function(err, ret_) {
    console.log("RELEASE====================> " + err + "   " + JSON.stringify(ret_) + '  RELEASE TIME--->' + new Date().getTime());
  }, agrsObj);
}
