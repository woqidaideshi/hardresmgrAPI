var base = require('./base');

// @description
//   exports the intent class
exports.Intent = base.Intent;

var reciver = null,
    appSig = null;
// @description
//   start up the intent reciver
// @param
//   selfAppSig: self's app signature who recives intents. -> String, necessary
//   handler: function for handling intents recived. -> Function, necessary
//   filter: filter intents to recive
//
exports.startReciver = function(selfAppSig, handler, filter) {
  if(reciver == null) {
    if(typeof selfAppSig === 'undefined' || typeof handler === 'undefined') 
      throw 'Not enough parameters to start reciver!!';
    reciver = base.ReciverIns(selfAppSig, handler, filter);
    appSig = selfAppSig;
    return console.log('The Reciver started OK');
  }
  console.log('The Reciver has already started');
}

// @description
//   shut down the intent reciver
// @param
//   selfAppSig: self's app signature who recives intents. -> String, necessary
//   handler: function for handling intents recived. -> Function, necessary
//   filter: filter intents to recive
//
exports.stopReciver = function() {
  if(reciver != null) {
    reciver.destroy();
    reciver = null;
    // delete reciver;
    appSig = null;
    return console.log('The Reciver stopped OK');
  }
  console.log('The Reciver hasn\'t started');
}

// @description
//   set filter
// @param
//   filter: the new filter
//
exports.setFilter = function(filter) {
  if(reciver != null)
    return reciver.setFilter(filter);
  console.log('The Reciver has not started');
}

// TODO: old APIs

// reimplement: how to get config information
// exports.getLocalData = getLocalData;
//
// replaced by Reciver
// exports.registerApp = registerApp;
//
// rename as "addListener"
// exports.registerIMApp = registerIMApp;
//
// replaced by Reciver
// exports.startIMService = startIMService;
//
// reimplement: use Intent.send (what's difference between these four interfaces?)
// maybe we can provide an intent pool
// exports.sendAppMsg = sendAppMsg;
// exports.sendAppMsgByDevice = sendAppMsgByDevice;
// exports.sendAppMsgByAccount = sendAppMsgByAccount;
// exports.sendIMMsg = sendIMMsg;
//
// reimplement: use Intent.send
// exports.sendFileTransferRequest = sendFileTransferRequest;
//
// replaced by dataTransfer.cpFile
// exports.sendFileTransferStart = sendFileTransferStart;
// exports.transferFileProcess = transferFileProcess;
//
// replaced by dataTransfer.cancel
// exports.transferCancelSender=transferCancelSender;
// exports.transferCancelReciever=transferCancelReciever;
//
// replaced by dataTransfer.on
// exports.transferProcessing = transferProcessing;
//
// exports.deleteTmpFile = deleteTmpFile;
// exports.transferFileOutOfDate = transferFileOutOfDate;
//

