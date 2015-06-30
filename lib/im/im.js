var base = require('./base');
var config = require('systemconfig')
//var router = require('../../backend/router.js');---how proxy?
var imChatPack=require("./imChat/IMChatPack");
var fileTransfer = require("./imChat/fileTransfer");
var fileTransferClient= require("./imChat/fileTransferClient");

var net = require('net');
var fs = require('fs');
var crypto = require('crypto');
var requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  dataTransferProxy = requireProxy('datatransfer'),
  router =  requireProxy('httpserver');

// @description
//   exports the intent class
var Intent=base.Intent;
exports.Intent = Intent;

var reciver = null,
    appSig = null;
// @description
//   start up the intent reciver
// @param
//   selfAppSig: self's app signature who recives intents. -> String, necessary
//   handler: function for handling intents recived. -> Function, necessary
//   filter: filter intents to recive
//
//exports.startReciver = function(selfAppSig, handler, filter) {
function startReciver  (selfAppSig, handler, filter) {
  if(reciver == null) {
    if(typeof selfAppSig === 'undefined' || typeof handler === 'undefined') 
      throw 'Not enough parameters to start reciver!!';
    reciver = base.ReciverIns(selfAppSig, handler, filter);
    appSig = selfAppSig;
    return console.log('The Reciver started OK');
  }
  console.log('The Reciver has already started');
}
exports.startReciver= startReciver;

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

/**
 * @method getLocalData
 *  获得设备信息，包括设备用户名和UID
 *
 * @param getLocalDataCb
 *   回调函数，返回设备信息
 *  @cbparam1
 *   JSON，表示设备信息，其中
 *   account字段表示设备的用户名
 *   UID字段表示设备的UUID
 *
 */
function getLocalData(getLocalDataCb){
  var localJson={};
  localJson['account']=config.ACCOUNT;
  localJson['UID']=config.uniqueID;
  localJson['IP']=config.SERVERIP;
  getLocalDataCb(localJson);
}
exports.getLocalData = getLocalData;

/**
 * @method registerApp
 *  在本机消息接收端口上添加新应用监听回调函数，本方法意在将多个
 * 应用的消息收发统一化，避免开多个通信端口。当新消息到达时，根
 * 据AppName来区分消息是分发给哪个应用的

 *  
 * @param selfAppSig
 *  string，新注册的应用名称，该名称用来区分消息的归属应用
 *
 * @param handler
 *   回调函数，为新应用添加的接收消息回调函数
 *
 * @param filter
 *   收到消息的过滤条件
 *
 */
function registerApp(selfAppSig, handler, filter) {
  startReciver(selfAppSig, handler, filter);
}
exports.registerApp = registerApp;


/**
 * @method registerIMApp
 *  在本机消息接收端口上添加即时通信监听回调函数
 *
 * @param AppCallBack
 *   回调函数，为即时通信添加的接收消息回调函数
 *  @cbparam1
 *   JSON，表示注册的App收到的消息内容，其中
 *    IP字段表示发送方的IP地址
 *    MsgObj字段表示收到消息的详细信息，其中
 *    MsgObj.message为收到的具体信息
 *    MsgObj.time表示发送时间，具体使用方法见测试
 *    MsgObj.from表示发送方的账户信息
 *    MsgObj.uuid表示发送方的设备UUID
 *
 * @param ws
 *  Object，设备显示终端的webSocket连接
 *  
 * @param filter
 *   收到消息的过滤条件
 *
 */
function registerIMApp(AppCallBack,ws,filter) {
  var msg = {
    'Action': 'on',
    'Event': 'imChat'
  };
  ws.send(JSON.stringify(msg));
  startReciver('imChat', function(recMsg){
    var CalBakMsg = {};
    CalBakMsg['MsgObj'] = JSON.parse(recMsg);
    CalBakMsg['IP'] = recMsg.fromip;
    router.wsNotify({
      'Action': 'notify',
      'Event': 'imChat',
      'Data': CalBakMsg
    });
  }, filter);
}
exports.registerIMApp = registerIMApp;

/**
 * @method sendAppMsg
 *  该函数用来给目的机器的指定应用程序发送消息
 *
 * @param SentCallBack
 *   回调函数，当消息发送成功时，调用该函数，并传参发送的消息
 *  @cbparam1
 *   string， 表示发送了的消息，具体为MsgObj.Msg，关于MsgObj下文有介绍
 *  
 * @param MsgObj
 *   JSON，待发送的消息结构体，其中：
 *  MsgObj.IP 表示接收方的IP地址
 *  MsgObj.UID 表示接收方的UUID
 *  MsgObj.Account表示接收方的帐号
 *  MsgObj.Msg表示要发送给指定应用的消息,为JSON转化的string类型。其中group表示对应组别，此处为“”，表示无组别;msg为发送消息内容
 *  MsgObj.App表示接收方的预先注册的接收该信息的应用名称，和registerApp中的AppName对应
 *  MsgObj.rsaflag表示发送方是否启用加密发送，若为“true” 注意，是string类型，不是bool类型。则启用加密发送。
 *  MsgOb举例如下：
 *  var msgobj = {
      IP: "192.168.1.100",
      UID: "fyfrio1997rio",
      Account: "fyf",
      Msg: "{'group':'','msg':'Hi  this is in IMSender test'}",
      App: "app1"
      rsaflag: "true"
    };
 *
 */
function sendAppMsg(SentCallBack, MsgObj) {
  var ipset = {};
  if (!net.isIP(MsgObj.IP)) {
    console.log('Input IP Format Error!:::', MsgObj.IP);
    return;
  };
  ipset["IP"] = MsgObj.IP;
  ipset["UID"] = MsgObj.UID;

  imChatPack.sendMSGbyUID(ipset, MsgObj.Account, MsgObj.Msg, MsgObj.App, function(recMsg){
    var intent=new  Intent(MsgObj.App,recMsg);
    intent.send(MsgObj.App, MsgObj.IP);
    SentCallBack(recMsg);
  });
}
exports.sendAppMsg = sendAppMsg;

/**
 * @method sendAppMsgByDevice
 *  该函数用来给目的机器的指定应用程序发送消息
 *
 * @param SentCallBack
 *   回调函数，当消息发送成功时，调用该函数，并传参接收端收到后封装的消息
 *  @cbparam1
 *   JSON， 表示发送的消息经接收端封装后的消息内容，其中
 *    IP字段表示发送方的IP地址
 *    destInfo表示发送方的信息内容，其中
 *    destInfo.Account表示接收端的账户信息
 *    destInfo.UID表示接收端的设备UUID
 *    destInfo.IP表示接收端的IP地址
 *    MsgObj字段表示接收端收到消息的详细信息，其中
 *    MsgObj.message为接收端应该接收的具体信息
 *    MsgObj.time表示发送时间，具体使用方法见测试
 *    MsgObj.from表示发送方的账户信息
 *    MsgObj.uuid表示发送方的设备UUID
 *  
 * @param MsgObj
 *  JSON，待发送的消息结构体，其中：
 *  MsgObj.IP 表示接收方的IP地址
 *  MsgObj.UID 表示接收方的UUID
 *  MsgObj.Account表示接收方的帐号
 *  MsgObj.Msg表示要发送给指定应用的消息,为JSON转化的string类型。其中group表示对应组别，此处为“”，表示无组别;msg为发送消息内容
 *  MsgObj.App表示接收方的预先注册的接收该信息的应用名称，和registerIMApp中的AppName对应，此处为imChat
 *  MsgObj.rsaflag表示发送方是否启用加密发送，若为“true” 注意，是string类型，不是bool类型。则启用加密发送。
 *  MsgOb举例如下：
 *  var msgobj = {
      IP: "192.168.1.100",
      UID: "fyfrio1997rio",
      Account: "fyf",
      Msg: "{'group':'','msg':'Hi  this is in IMSender test'}",
      App: "app1"
      rsaflag: "true"
    };
 *  
 * @param wsID
 * string，发送端的webSocket连接的sessionID
 *  
 * @param flag
 * boolean，是否需要发送端发送给其显示终端，true表示需要发送，false表示不需要发送
 *
 */
function sendAppMsgByDevice(SentCallBack, MsgObj,wsID,flag) {
  var ipset = {};
  if (!net.isIP(MsgObj.IP)) {
    console.log('Input IP Format Error!:::', MsgObj.IP);
    return;
  };
  ipset["IP"] = MsgObj.IP;
  ipset["UID"] = MsgObj.UID;

  imChatPack.sendMSGbyUID(ipset, MsgObj.Account, MsgObj.Msg, MsgObj.App, function(recMsg) {
    var intent = new Intent(MsgObj.App, recMsg);
    intent.send(MsgObj.App, MsgObj.IP);
    SentCallBack(recMsg);
    if (flag) {
      recMsg['destInfo'] = {
        'Account': MsgObj.Account,
        'UID': MsgObj.UID,
        'IP': MsgObj.IP
      };
      router.wsNotify({
        'Action': 'notify',
        'Event': 'imChat',
        'Data': recMsg,
        'SessionID': wsID
      });
    }
  });
}
exports.sendAppMsgByDevice = sendAppMsgByDevice;

/**
 * @method sendAppMsgByAccount
 *  该函数用来给目的帐号（一个帐号下的设备组）的指定应用程序发送消息
 *
 * @param SentCallBack
 *   回调函数，当消息发送成功时，调用该函数，并传参接收端收到后封装的消息
 *  @cbparam1
 *   JSON， 表示发送的消息经接收端封装后的消息内容，其中
 *    IP字段表示发送方的IP地址
 *    destInfo表示发送方的信息内容，其中
 *    destInfo.Account表示接收端的账户信息
 *    MsgObj字段表示接收端收到消息的详细信息，其中
 *    MsgObj.message为接收端应该接收的具体信息
 *    MsgObj.time表示发送时间，具体使用方法见测试
 *    MsgObj.from表示发送方的账户信息
 *    MsgObj.uuid表示发送方的设备UUID
 *  
 * @param MsgObj
 *   JSON,待发送的消息结构体，其中：
 *  MsgObj.toAccList 表示接收方的IP以及UID集合
 *  MsgObj.Account表示接收方的帐号
 *  MsgObj.localUID表示正在登录帐号的对应设备的UID
 *  MsgObj.Msg表示要发送给指定应用的消息,为JSON转化的string类型。其中group表示对应组别，此处为“fyf”，表示组别为fyf;msg为发送消息内容
 *  MsgObj.App表示接收方的预先注册的接收该信息的应用名称，和registerIMApp中的AppName对应，此处为imChat
 *  MsgObj.rsaflag表示发送方是否启用加密发送，若为“true” 注意，是string类型，不是bool类型。则启用加密发送。
 *  MsgOb举例如下：
 *  var msgobj = {
      toAccList: {
        "fyfrio1997rio":{
          "toIP":'192.168.121.12',
          "toUID":'fyfrio1997rio',
          "toAccount":"fyf"
        },
        "fyfrio1998rio":{
            "toIP":'192.168.121.13',
            "toUID":'fyfrio1998rio',
            "toAccount":"fyf"
        }
      },
      Account: "fyf",
      localUID: "fyfrio1997rio",
      Msg: "{'group':'fyf','msg':'Hi  this is in IMSender test'}",
      App: "app1"
      rsaflag: "true"
    };
 *  
 * @param wsID
 * string，发送端的webSocket连接的sessionID
 *  
 * @param flag
 * boolean，是否需要发送端发送给其显示终端，true表示需要发送，false表示不需要发送
 *
 */
function sendAppMsgByAccount(SentCallBack, MsgObj,wsID,flag) {
  var accSetItem = {};
  var ipset = {};
  var countFlag = 0;
  var msgRst = undefined; //msgRst初始值为undefined;发送消息收到应到之后，msgRst=msg（收到应答后返回此次发送的消息内容）;发送消息未收到应到时，msgRst=msg（undefined）。该发送消息方法的回调函数会返回发送消息返回结果msgRst
  var len = Object.keys(MsgObj.toAccList).length;
  for (var accSetItemKey in MsgObj.toAccList) {
    accSetItem = MsgObj.toAccList[accSetItemKey];
    if (MsgObj.localUID === accSetItemKey) {
      len -= 1;
      if (countFlag === len) {
        SentCallBack(msgRst);
        if(flag&&msgRst!==undefined){
          msgRst['destInfo']={'Account':MsgObj.Account,'UID':MsgObj.UID,'IP':MsgObj.IP};
          if(msgRst.MsgObj===undefined){
            msgRst['MsgObj']={'message':MsgObj.Msg,'from':MsgObj.Account,'uuid':MsgObj.localUID};
          }
          router.wsNotify({
            'Action': 'notify',
            'Event': 'imChat',
            'Data': msgRst,
            'SessionID':wsID
          });
        }
      }
      return;
    } else {
      if (accSetItem===undefined||!net.isIP(accSetItem.toIP)) {
        console.log('Input IP Format Error!:::', accSetItem===undefined?'undefined':accSetItem.toIP);
        if ((++countFlag) === len) {
          SentCallBack(msgRst);
          if(flag&&msgRst!==undefined){
            msgRst['destInfo']={'Account':MsgObj.Account,'UID':MsgObj.UID,'IP':MsgObj.IP};
            if(msgRst.MsgObj===undefined){
              msgRst['MsgObj']={'message':MsgObj.Msg,'from':MsgObj.Account,'uuid':MsgObj.localUID};
            }
            router.wsNotify({
              'Action': 'notify',
              'Event': 'imChat',
              'Data': msgRst,
              'SessionID':wsID
            });
          }
          return;
        }
      } else {
        ipset["IP"] = accSetItem.toIP;
        ipset["UID"] = accSetItem.toUID;
        imChatPack.sendMSGbyUID(ipset, accSetItem.toAccount, MsgObj.Msg, MsgObj.App, function(recMsg) {
          var intent = new Intent(MsgObj.App, recMsg);
          intent.send(MsgObj.App, MsgObj.IP);
          if (msgRst === undefined )
            msgRst = recMsg;
          if ((++countFlag) === len) {
            SentCallBack(msgRst);
            if (flag && msgRst !== undefined) {
              msgRst['destInfo'] = {
                'Account': MsgObj.Account,
                'UID': MsgObj.UID,
                'IP': MsgObj.IP
              };
              router.wsNotify({
                'Action': 'notify',
                'Event': 'imChat',
                'Data': msgRst,
                'SessionID': wsID
              });
            }
            return;
          }
        });
      }
    }
  }
}
exports.sendAppMsgByAccount = sendAppMsgByAccount;

/**
 * @method sendIMMsg
 *  该函数用来给目的帐号（与一组设备）或者设备的指定应用程序发送消息
 *
 * @param SentCallBack
 *   回调函数，作为调用具体发送函数sendAppMsgByDevice或者sendAppMsgByAccount的参数\
 * 
 * @param MsgObj
 *   JSON,待发送的消息结构体，其中：
 *  MsgObj.IP 表示接收方的IP地址
 *  MsgObj.UID 表示接收方的UUID
 *  MsgObj.toAccList 表示接收方的IP以及UID集合
 *  MsgObj.Account表示接收方的帐号
 *  MsgObj.localUID表示正在登录帐号的对应设备的UID
 *  MsgObj.group表示消息发送以及接收端群组名称
 *  MsgObj.Msg表示要发送给指定应用的消息,为JSON转化的string类型。其中group表示对应组别，此处为“fyf”，表示组别为fyf;msg为发送消息内容
 *  MsgObj.App表示接收方的预先注册的接收该信息的应用名称，和registerIMApp中的AppName对应，此处为imChat
 *  MsgObj.rsaflag表示发送方是否启用加密发送，若为“true” 注意，是string类型，不是bool类型。则启用加密发送。
 *  MsgOb举例如下：
 *  var msgobj = {
      toAccList: {
        "fyfrio1997rio":{
          "toIP":'192.168.121.12',
          "toUID":'fyfrio1997rio',
          "toAccount":"fyf"
        },
        "fyfrio1998rio":{
            "toIP":'192.168.121.13',
            "toUID":'fyfrio1998rio',
            "toAccount":"fyf"
        }
      },
      Account: "fyf",
      localUID: "fyfrio1997rio",
      group: "fyf",
      Msg: "{'group':'fyf','msg':'Hi  this is in IMSender test'}",
      App: "app1"
      rsaflag: "true"
    };
 * 
 * @param wsID
 * string，发送端的webSocket连接的sessionID
 * 
 * @param flag
 * boolean，是否需要发送端发送给其显示终端，true表示需要发送，false表示不需要发送
 *
 */
function sendIMMsg(SentCallBack, MsgObj,wsID,flag){
  if(MsgObj.group===''){
    sendAppMsgByDevice(SentCallBack, MsgObj,wsID,flag);
  }else{
    sendAppMsgByAccount(SentCallBack, MsgObj,wsID,flag);
  }
}
exports.sendIMMsg = sendIMMsg;

/**
 * @method sendFileTransferRequest
 *  发送端发送传输文件请求
 *
 * @param sendFileTransferRequestCb
 *   回调函数
 *   @cbparam1
 *      boolean，返回操作出错与否，出错则返回true,无错则返回false
 *   @cbparam2
 *      JSON，返回待传输的文件信息MsgObj或者出错信息
 * 
 * @param MsgObj
 *   启动程序参数，json格式封装，其中：
 *  MsgObj.IP 表示接收方的IP地址
 *  MsgObj.UID 表示接收方的UUID
 *  MsgObj.Account表示接收方的帐号
 *  MsgObj.Msg表示代传输文件的路径
 *  MsgObj.App表示接收方的预先注册的接收该信息的应用名称，和registerIMApp中的AppName对应，此处为imChat
 *  MsgOb举例如下：
 *  var msgobj = {
      IP: "192.168.1.100",
      UID: "2312324323dsfseferfgdghf",
      Account: "USER2",
      group:'',
      localUID:'rio000rio',
      Msg: "/media/fyf/BACKUP/test.txt",
      App: "app1"
    };
 */
function sendFileTransferRequest(sendFileTransferRequestCb, MsgObj) {
  fileTransfer.fileTransferInit(MsgObj.Msg,function(err,msg){
    if(err){
      sendFileTransferRequestCb(err,msg);
    }else{
      var id=MsgObj.group===''?MsgObj.Account+MsgObj.UID:MsgObj.group+MsgObj.localUID;
      msg['key']=MD5(id + MsgObj.Msg+new Date().getTime());
      MsgObj.Msg=msg;
      sendFileTransferRequestCb(err,MsgObj);
    }
  });
 }
exports.sendFileTransferRequest = sendFileTransferRequest;

/**
 * @method transferFileProcess
 *  接收端收到发送端可以进行文件传输消息后，开始文件传输
 *
 * @param transferFileCb
 *   回调函数
 *   @cbparam1
 *      boolean， 返回操作出错与否，出错则返回true,无错则返回false
 *   @cbparam2
 *      JSON， 返回待传输的文件信息MsgObj
 * 
 * @param MsgObj 
 *   启动程序参数，JSON，待发送的消息结构体，其中：
 *  MsgOb举例如下：
 *  var msgobj = {
       type: "file",
       option: 0x0001,
       fileName: "test.txt",
       key:"57374caa837997035b5fbc1d7732a66b",
       fileSize: "1024",
       msg: "I want to get the file"
     };
 * 
 * @param sendMsg 
 * JSON，接收端的信息结构体，其中：
 *  sendMsg.IP 表示接收方的IP地址
 *  sendMsg.UID 表示接收方的UUID
 *  sendMsg.Account表示接收方的帐号
 *  sendMsg.group表示消息发送以及接收端群组名称
 *  MsgOb举例如下：
 *  var msgobj = {
      IP: "192.168.1.100",
      UID: "fyfrio1997rio",
      Account: "fyf",
      group:'fyf'
    };
 * 
 * @param isLocal 
 * boolean，是否为设备本地操作，true表示为设备本地，false表示为浏览器操作
 * 
 */
 function acceptAndreceiveFileProcess(transferFileCb, msgObj, sendMsg,isLocal) {
//function transferFileProcess(transferFileCb, msgObj, sendMsg,isLocal) {
  fileTransferClient.transferFileProcess(function(err, rst) { //传输文件 
    msgObj['option'] = 0x0010;    
    if (err) { //创建文件夹------------界面显示     
      msgObj['state'] = 2;
      msgObj['msg'] = 'make dir error:' + rst;
      transferFileCb(err, msgObj);
    } else {
      proxy.cpFile(sendMsg.IP + ':' + msgObj.srcPath, rst.filePath, function(ret){
        if(ret.err) {
          msgObj['state'] = 2;
          msgObj['msg'] = 'receive file init error :' + rst;
          transferFileCb(ret.err, msgObj);
        }else{
          console.log('File transferring...');
          msgObj = rst;
          msgObj['state'] = 1;
          msgObj['fileID'] = ret.ret.sessionID;
          transferFileCb(false, msgObj);
          proxy.on('file#' + msgObj.fileID, function(percentage, dir) {
            console.log('Progress:', percentage + '%', dir);
            msgObj['option'] = 0x0030;
            msgObj['state']=1;
            msgObj['ratio']=percentage;
            notifyRatio(msgObj,sendMsg,transferFileCb);
            //transferFileCb(false, msgObj);
          }).on('error#' + msgObj.fileID, function(err) {
            console.log('Error:', err);
            //调用显示传输进度的函数 ----------------currentRatio
            msgObj['option'] = 0x0030;
            msgObj['state']=2;
            msgObj['ratio']=0;
            notifyRatio(msgObj,sendMsg,transferFileCb);
            //transferFileCb(false,msgObj );
          }).on('end#' + msgObj.fileID, function(err) {
            if(err) {//---------currentRatio
              msgObj['option'] = 0x0030;
              msgObj['state']=2;
              msgObj['ratio']=0;
              notifyRatio(msgObj,sendMsg,transferFileCb);
              //transferFileCb(false, msgObj);
            }else{
              msgObj['option'] = 0x0030;
              msgObj['state']=2;
              msgObj['ratio']=0;
              notifyRatio(msgObj,sendMsg,transferFileCb);
              //transferFileCb(false, msgObj);
            }
          });
        }
      });
    }
  });
}
exports.acceptAndreceiveFileProcess = acceptAndreceiveFileProcess;

function notifyRatio(msgObj,sendMsg,cb) {
  cb(false,msgObj);
  var sendM = {};
  var CalBakMsg = {};
  sendM['from'] = config.ACCOUNT;
  sendM['uuid'] = config.uniqueID;
  sendM['to'] = sendMsg.Account;
  sendM['message'] = JSON.stringify({
    'group': sendMsg.group,
    'msg': msgObj
  });
  CalBakMsg['MsgObj'] = sendM;
  CalBakMsg['IP'] = sendMsg.IP;
  CalBakMsg['destInfo'] = {
    'Account': sendMsg.Account,
    'UID': sendMsg.UID,
    'IP': sendMsg.IP
  };
  router.wsNotify({
    'Action': 'notify',
    'Event': 'imChat',
    'Data': CalBakMsg
  });
}
/**
 * @method transferCancelSender
 *  发送端中止文件传输
 * 
 * @param transferCancelSenderCb
 *   回调函数
 *   @cbparam1
 *      JSON, 返回中止传输的文件信息MsgObj
 * 
 * @param MsgObj 
 *   启动程序参数，JSON，待发送的消息结构体，其中：
 *  MsgOb举例如下：
 *  var msgobj = {
       type: "file",
       option: 0x0000,
       fileName: "test.txt",
       key:"57374caa837997035b5fbc1d7732a66b",
       fileSize: "1024",
       msg: "do you  want to get the file"
     };
 * 
 * @param flag 
 *  boolean，是否中断传输
 * 
 * @param state 
 *  int，帐号（设备组）通信窗口下，0表示发送方取消传输文件;1表示帐号下某个设备接收文件时，发送方取消对其他设备传输文件;2表示帐号下某个设备拒绝接收文件时，发送方取消对其他设备传输文件
 *  
 */
function transferCancelSender(transferCancelSenderCb, flag,msgObj, fileID, state) { //接收端取消传输文件-----界面显示
  if (flag&&fileID) {
    dataTransferProxy.cancel(function(ret) {
      if (ret.err) {
        return transferCancelSenderCb(ret.err, msgObj);
      } else {
        console.log('File transmission canceled.');
        fileTransfer.transferFileCancelSender(msgObj, state, function() {
          transferCancelSenderCb(null,msgObj);
        });
      }
    }, fileID);
  } else {
    console.log('File transmission canceled.');
    fileTransfer.transferFileCancelSender(msgObj, state, function() {
      transferCancelSenderCb(null,msgObj);
    });
  }
}
exports.transferCancelSender = transferCancelSender;

/**
 * @method transferCancelReciever
 *  接收端取消文件接收
 * 
 * @param transferCancelRecieverCb
 *   回调函数
 * 
 * @param key
 *   string，启动程序参数，正在接手文件的key值（一串MD5值），例如57374caa837997035b5fbc1d7732a66b
 */
function transferCancelReciever(transferCancelRecieverCb, msgObj, fileID) { //接收端取消传输文件-----界面显示
  dataTransferProxy.cancel(fileID, function(ret) {
    if (ret.err) {
      transferCancelRecieverCb(ret.err,msgObj);
    }else{
      console.log('File transmission canceled.');
      fileTransfer.transferCancelReciever(msgObj, function() {
        transferCancelRecieverCb(null,msgObj);
      });
    }
  });
}
exports.transferCancelReciever=transferCancelReciever;

/**
 * @method transferProcessing
 *  发送端收到接收端发送的传输文件进度信息后台处理函数
 * 
 * @param transferProcessingCb
 *   回调函数
 * 
 * @param msgObj 
 *   启动程序参数，json格式封装
 *   JSON,待发送的消息结构体，其中：
 *  MsgOb举例如下：
 *  var msgobj = {
       type: "file",
       option: 0x0002,
       fileName: "test.txt",
       fileSize: "1024",
       key:"57374caa837997035b5fbc1d7732a66b",
       ratio:0.1234,
       msg: "I want to get the file"
     };
 *  
 */
function sendFileProcess(sendFileProcessCb, msgObj,sendMsg) {
  //function transferProcessing(transferProcessingCb, msgObj) {
  //此处调用显示进度等传输问题的信息
  dataTransferProxy.on('progress#' + msgObj.fileID, function(percentage, dir) {
    console.log('Progress:', percentage + '%', dir + "0000");
    msgObj['option'] = 0x0030;
    msgObj['state'] = 1;
    msgObj['ratio'] = percentage;
    sendFileProcessCb(false, msgObj);
    //notifyRatio(msgObj,sendMsg,transferProcessingCb);
  }).on('error#' + msgObj.fileID, function(err) {
    console.log('Error:', err);
    msgObj['option'] = 0x0030;
    msgObj['state'] = 2;
    msgObj['ratio'] = 0;
    //transferProcessingCb(false, msgObj);
    notifyRatio(msgObj,sendMsg,sendFileProcessCb);
  }).on('end#' + msgObj.fileID, function(err) {
    if (err) {
      msgObj['option'] = 0x0030;
      msgObj['state'] = 2;
      msgObj['ratio'] = 0;
      //transferProcessingCb(false, msgObj);
      notifyRatio(msgObj,sendMsg,sendFileProcessCb);
    } else {
      msgObj['option'] = 0x0030;
      msgObj['state'] = 3;
      msgObj['ratio'] = 1;
      console.log('Transmission OK!');
      //transferProcessingCb(false, msgObj);
      notifyRatio(msgObj,sendMsg,sendFileProcessCb);
    }
  });
}
exports.sendFileProcess = sendFileProcess;

/**
 * @method deleteTmpFile
 *  接收端将接收到并存储于临时目录下的文件删除
 * 
 * @param deleteTmpFileCb
 *   回调函数
 *   @cbparam1
 *       boolean， 返回操作出错与否，出错则返回true,无错则返回false
 *   @cbparam2
 *       string， 返回操作结果消息提示
 * 
 * @param tmpFilePath 
 *   启动程序参数，string，文件存储的临时路径
 */
function deleteTmpFile(deleteTmpFileCb,tmpFilePath){ 
  fileTransferClient.deleteTmpFile(tmpFilePath,function(err,msg){
    deleteTmpFileCb(err,msg);
  });
}
exports.deleteTmpFile = deleteTmpFile;

function transferFileOutOfDate(transferFileOutOfDateCb,msgObj) {
  var msg = msgObj;
  msg['option'] = 0x0004;
  transferFileOutOfDateCb(msg);
}
exports.transferFileOutOfDate = transferFileOutOfDate;

function refuseFileItemTransfer(refuseFileItemTransferCb,msgObj) {
  var msg = msgObj;
  msg['option'] = 0x0010;
  msg['state']=0;
  refuseFileItemTransferCb(msg);
}
exports.transferFileOutOfDate = transferFileOutOfDate;

function MD5(str, encoding) {
  return crypto.createHash('md5').update(str).digest(encoding || 'hex');
}