var requireProxy = require('../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
    cd = requireProxy('commdaemon');
// var serie = require('utils').Flowctl();

// function remoteObj(servName, IP) {
  // this.im = null;
  // this.serv = servName;
  // var self = this;
  // this.init = function(cb) {
    // proxy.requireProxy(['im'], IP, function(improxy) {
      // self.im = improxy;
      // cb(null);
    // });
  // }
// }

// remoteObj.prototype.sendmsg = function(content,rescall) {
  // var self = this;
  // if (this.im === null) {
    // serie.series([{
      // fn: function(pera_, cb_) {
        // console.log("init proxy");
        // self.init(cb_);
      // },
      // pera: {}
    // }, {
      // fn: function(pera_, cb_) {
        // self.insend(pera_.con, cb_, pera_.sentcb);
      // },
      // pera: {
        // con: content,
        // sentcb: rescall
      // }
    // }], function(err_, rets_) {

    // });
  // } else {
    // this.insend(content, function() {},self.rescall);
  // }
// }

// remoteObj.prototype.insend = function(content, cb,callback) {
  // var msg = {};
  // msg.typ = this.serv;
  // msg.txt = content;
  // this.im.send(JSON.stringify(msg), function(res) {
    // callback(res);
  // });
  // cb(null);
// }

//this function is used to get remote service object , developers can use this object to send message to remote service
//para: servName: remote Service name.
//para: IP : remote IP address
//e.g. :getRemoteObj('E1',"192.168.1.2");
// exports.getRemoteObj = function(servName, IP) {
  // var rObj = new remoteObj(servName, IP);
  // return rObj;
// }

// function LocalServ(servName, cb) {
  // this.im = null;
  // this.serv = servName;
  // this.callback = cb;
// }

// LocalServ.prototype.run = function() {
  // var self = this;
  // proxy.requireProxy(['im'], function(improxy) {
    // self.im = improxy;
    // improxy.on(self.serv, self.callback);
  // });
// }

// LocalServ.prototype.stop = function() {
  // this.im.off(self.serv, self.callback);
// }

// var localObj = null;

// //this function is used to get local service object, if you want to start a service called by a remote client, you
// //should call this first
// //para: servName: local service name
// //para: cb : callback when recieve remote call
// //e.g. :getLocalServ('E1',function(str){
// //   console.log("received msg : ",str,"from E1 service");
// //});
// exports.getLocalServ = function(servName, cb) {
  // if (localObj === null) {
    // localObj = new LocalServ(servName, cb);
  // }
  // return localObj;
// }

// IM intent
function Intent(selfAppSig, content) {
  this._appSig = selfAppSig;
  this._content = content;
}

Intent.prototype.setContent = function(content) {
  this._content = content;
}

Intent.prototype.send = function(dstAppSig, addr) {
  var dstAddr = addr || 'local';
  cd.send(dstAddr, {
    action: 2,
    args: [dstAppSig, {
      src: this._appSig,
      content: this._content
    }],
    svr: this._appSig,
    func: 'intent.send'
  }, function(ret) {
    console.log(ret);
  });
}

exports.Intent = Intent;

// for intent reciver
function Reciver(selfAppSig, handler, filter) {
  var self = this;
  self._appSig = selfAppSig;
  self._handler = handler;
  self._filter = filter;

  cd.on(selfAppSig, self._doRecive);
}

Reciver.prototype.destroy = function() {
  cd.off(selfAppSig, this._dispatcher);
}

Reciver.prototype._doRecive = function(msg) {
  var self = reciver;
  if(self._doFilter(msg))
    self._handler.call(this, msg.content);
}

Reciver.prototype._doFilter = function(msg) {
  if(typeof this._filter === 'undefined')
    return true;
}

Reciver.prototype.setFilter = function(filter) {
  this._filter = filter;
}

var reciver = null;
exports.startReciver = function(selfAppSig, handler, filter) {
  if(reciver == null) {
    if(typeof selfAppSig === 'undefined' || typeof handler === 'undefined') 
      throw 'Not enough parameters to start reciver!!';
    reciver = new Reciver(selfAppSig, handler, filter);
    return console.log('The Reciver started OK');
  }
  console.log('The Reciver has already started');
}

exports.stopReciver = function() {
  if(reciver != null) {
    reciver.destroy();
    delete reciver;
    reciver = null;
    return console.log('The Reciver stopped OK');
  }
  console.log('The Reciver hasn\'t started');
}

exports.setFilter = function(filter) {
  if(reciver != null)
    return reciver.setFilter(filter);
  console.log('The Reciver has not started');
}

