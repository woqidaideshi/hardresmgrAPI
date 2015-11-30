var path = require("path"),
  util = require('util'),
  events = require('events'),
  utils = require('utils');
  flowctl = utils.Flowctl(),
  json4line = utils.Json4line();
  requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync;
var configPath =__dirname + '/config.json';
var simulate=require('../../../../service/hardresmgr/implements/simulate');
function ResourceMgr() {
  var self = this;
  events.EventEmitter.call(self);
  this._config = undefined;
  this.resourceMgr = {};
}
util.inherits(ResourceMgr, events.EventEmitter);

ResourceMgr.prototype._initResourceCfg = function(callback_) {
  var self = this;
  try {
    json4line.readJSONFile(configPath, function(err_, data_) {
      if (err_) callback_(err_);
      else {
        self._config = data_;
        callback_(null);
      }
    });
  } catch (e) {
    callback_(e);
  }
}

ResourceMgr.prototype._getProxy = function(callback_, argsObj_) {
  var self = this;
  try {
    if (self.resourceMgr[argsObj_['type'][0] + argsObj_['desc']['IP']] === undefined) {
      self._initProxy(function(err_, rst_) {
        callback_(err_, rst_);
      }, argsObj_);
    } else callback_(null, self.resourceMgr[argsObj_['type'][0] + argsObj_['desc']['IP']]);
  } catch (e) {
    callback_(e);
  }
}

ResourceMgr.prototype._initProxy = function(callback_, argsObj_) {
  var self = this;
  if (self._config === undefined) {
    self._initResourceCfg(function(err_) {
      if (err_) callback_(err_);
      else {
        self._initProxyItem(callback_, argsObj_);
      }
    });
  } else self._initProxyItem(callback_, argsObj_);
}

ResourceMgr.prototype._initProxyItem = function(callback_, argsObj_) {
  var self = this;
  try {
    mgrType=argsObj_['type'][0];
    if (self._config[mgrType] === undefined) callback_('no such a resource mgr');
    else {
      var key=mgrType+argsObj_['desc']['IP'];
      if(argsObj_['desc']['IP']===undefined)
        self.resourceMgr[key] = requireProxy(self._config[mgrType]['name']);
      else self.resourceMgr[key] = requireProxy(self._config[mgrType]['name'],argsObj_['desc']['IP']);
      self.resourceMgr[key].on('stateChange', function(obj_) {
        console.log('change--->'+JSON.stringify(obj_));
        self.emit(obj_.type, obj_);
      });
      callback_(null, self.resourceMgr[key]);
    }
  } catch (e) {
    callback_(e);
  }
}

/**
 * @method getResourceList
 *   根据参数获取资源列表
 *
 * @param1 callback function(err, rst)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      rst: resource info
 * @param2 params string
 *   传入的参数，可以json格式封装
 *  {
 *    'type':['all'];//['all']:获取所有资源数据;['hardResouce']:获取硬件资源的所有数据;['hardResouce','input']:获取硬件资源的所有输入设备数据
 *  }
 */
ResourceMgr.prototype.getResourceList = function(callback_, argsObj_) {
  var self = this;
  var category = argsObj_.type[0];
  var rst = {};
  switch (category) {
    case 'all':
      {
        var parsesSet = [];
        var getParsesSet = function(getKeysCb_) {
          if (self._config === undefined) {
            self._initResourceCfg(function(err_) {
              if (err_) getKeysCb_('init resouce config error');
              else {
                setParsesSet(getKeysCb_);
              }
            });
          } else {
            setParsesSet(getKeysCb_);
          }
        }
        var setParsesSet = function(cb_) {
          var parseSet = {};
          for (var key in self._config) {
            parseSet = {};
            parseSet['type'] = [key];
            parseSet['desc'] = argsObj_['desc'];
            parsesSet.push(parseSet);
          }
          cb_();
        }
        var func = function(parseSet, funcCb) {
          self._getProxy(function(err_, proxy_) {
            if (err_) funcCb(err_);
            else {
              proxy_.getResourceList(argsObj_, function(ret_) {
                if (ret_.err) console.log('get all resource list error ' + keyStr);
                else {
                  rst[parseSet['type'][0]] = ret_.ret;
                }
                funcCb();
              });
            }
          }, parseSet);
        }
        flowctl.series([{
          fn: function(pera_, cb_) {
            getParsesSet(cb_);
          },
          pera: {}
        }, {
          fn: function(pera_, cb_) {
            flowctl.parallel1(parsesSet, func, function(err_, rets_) {
              cb_(err_, rst);
            });
          },
          pera: {}
        }], function(err_, rets_) {
          callback_(err_, rst);
        });
      }
      break;
    default:
      {

        self._getProxy(function(err_, proxy_) {
          if (err_) callback_(err_);
          else {
            var agrsTmp_ = {};
            if (argsObj_['type'].length === 1) {
              agrsTmp_['type'] = ['all'];
              agrsTmp_['desc'] = argsObj_['desc'];
            } else {
              agrsTmp_ = argsObj_;
            }
            proxy_.getResourceList(agrsTmp_, function(ret_) {
              if (ret_.err) console.log('get  resource list error ' + ret_.err);
              else {
                rst = ret_.ret;
              }
              callback_(ret_.err, rst);
            });
          }
        }, argsObj_);
      }
  }
}

/**
 * @method applyResource
 *   获取资源
 *
 * @param1 callback function(err, rst)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      rst: resource info 成功获取的资源信息
 *      {"type":["hardResource"],"detail":[{"type":["output","audio"]}],"option":0}//option:0-获取失败也不强制其他操作回滚;1-获取失败其他操作回滚（默认abort）;2-强制占用资源-未实现
 * @param2 agrsObj_
 *   传入的参数，可以json格式封装
 *  {
 *    'type':['hardResource'],//hardResouce:硬件资源
 *    'detail':[{'type':['input','camera'],"option":0},{['output','video']},{['output','audio'],"option":0}]
 *  }
 */
ResourceMgr.prototype.applyResource = function(callback_, argsObj_) {
  var self = this;
  var detail = argsObj_['detail'];
  if (detail === undefined) return callback_('arguments is not correct', undefined);
  self._getProxy(function(err_, proxy_) {
    if (err_) return callback_(err_);
    proxy_.applyResource(argsObj_, function(ret_) {
      if (ret_.err) console.log('apply resource state error');
      else{
        var keyM=false;
        console.log(ret_)
        if(ret_.ret.type==='hardResource'&&ret_.ret.detail!=null){
          var de=ret.ret.detail;
          for (var i=0;i<de.length;i++){
            if(de[i]['type'][1]=='key'||de[i]['type'][1]=='mouse')keyM=true;
          }
        }
        if(keyM){
          var proxy = require('../../../../service/hardresmgr/interface/hardresmgrProxyRemote').getProxy('192.168.160.66');
          proxy.getChannel({
            type: 'mouseKey'
          }, 'abcd', function(err, channel) {
          if(err) return console.log(err);
          channel.on('data', function(chuck) {
            console.log(chuck.toString())
            simulate.simulateMouseKey(chuck.toString());
          }).on('end', function() {
            console.log('Over');
          }).on('error', function(err) {
            console.log(err);
          });
        });
        }
      }
      callback_(ret_.err, ret_.ret);
      var proxy = requireProxy('hardresmgr','192.168.160.18');
      proxy.getChannel({
          type: 'mouse'
        }, 'abcd', function(err, channel) {
        if(err) return console.log(err);
        channel.on('data', function(chuck) {
          console.log('client:', chuck + '');
        }).on('end', function() {
          console.log('Over');
        }).on('error', function(err) {
          console.log(err);
        });
      });
    });
  }, argsObj_);
}

/**
 * @method releaseResource
 *   获取资源
 *
 * @param1 callback function(err, rst)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      rst: resource info 成功释放的资源信息
 *      {"type":["hardResource"],"detail":[{"type":["output","audio"]},{"type":["output","video"]}]}
 * @param2 agrsObj_
 *   传入的参数，可以json格式封装
 *  {
 *    'type':['hardResource'],//hardResouce:硬件资源
 *    'detail':[{'type':['input','camera']},{'type':['output','video']},{'type':['output','audio']}]
 *  }
 */
ResourceMgr.prototype.releaseResource = function(callback_, argsObj_) {
  var self = this;
  var detail = argsObj_['detail'];
  if (detail === undefined) return callback_('arguments is not correct', undefined);
  self._getProxy(function(err_, proxy_) {
    if (err_) return callback_(err_);
    proxy_.releaseResource(argsObj_, function(ret_) {
      if (ret_.err) console.log('release resource  error ');
      callback_(ret_.err, ret_.ret);
    });
  }, argsObj_);
}

var resMgr = null;
/**
 * @method getResMgr
 *   接口对象
 *
 * @param1 callback function(err, rst)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      rst: ResourceMgr
 */
function getResMgr() {
  if (resMgr == null) {
    resMgr = new ResourceMgr();
  } 
  return resMgr;
}
exports.getResMgr=getResMgr;
