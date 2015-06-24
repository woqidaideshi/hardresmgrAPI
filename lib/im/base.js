var requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
    cd = requireProxy('commdaemon');

// @description
//   IM intent class
// @param
//   selfAppSig: self's app signature who sends this intent. -> String, necessary
//   content: content to send. -> Object, optional
// 
function Intent(selfAppSig, content) {
  this._appSig = selfAppSig;
  this._content = content;
}

Intent.prototype.setContent = function(content) {
  this._content = content;
}

// @description
//   send this intent to target process
// @param
//   dstAppSig: target process' app signature. -> String, necessary
//   addr: net address of target devices. -> String, optional
//
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

// @description
//   Reciver for reciving intents
// @param
//   selfAppSig: self's app signature who recives intents. -> String, necessary
//   handler: function for handling intents recived. -> Function, necessary
//   filter: filter intents to recive
//
function Reciver(selfAppSig, handler, filter) {
  var self = this;
  self._appSig = selfAppSig;
  self._handler = handler;
  self._filter = filter;

  cd.on(selfAppSig, self._doRecive);
}

// @description
//   destroy the intent reciver
// 
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

exports.Reciver = Reciver;
