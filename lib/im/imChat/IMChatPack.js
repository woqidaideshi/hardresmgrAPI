var fs = require('fs');
var requireProxy = require('../../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  dataMgr=requireProxy('data');

var config={};
dataMgr.getLocalData(function(ret){
  config=ret.ret;
});

function getLocalData(callback){
  var obj={};
  for(var key in config){
    obj[key]=config[key];
  }
  callback(obj);
}
exports.getLocalData=getLocalData;
/*
 * @method sendMSGbyUID
 *  封装数据
 * @param ACCOUNT 接收端的用户名
 * @param MSG
 *  用encapsuMSG包装过的待发送消息
 *@param SentCallBack
 *发送方发送数据成功后的callback函数
 * @return JSON
 *  封装的包的内容
 */
function sendMSGbyUID( ACCOUNT, MSG, SENTCALLBACK) {
  var tmpMsg = encapsuMSG(MSG,  config.account, config.UID, ACCOUNT);
  var CalBakMsg = {};
  CalBakMsg['MsgObj'] = tmpMsg;
  setTimeout(SENTCALLBACK(CalBakMsg), 0);
}

/*
 * @method encapsuMSG
 *  将待发送的消息封装成JSON格式，并将JSON数据序列化
 * @param MSG
 *  消息内容，如可以是聊天内容，上下线通知等
 * @param FROM
 *  消息的发送方标识，可以是Account帐号
 * @param FROMUUID
 *  消息的发送方的UUID
 * @param TO
 *  消息的接收方标识，可以是Account帐号
 * @return rply
 *  封装好，并且已经序列化的消息字符串
 */
function encapsuMSG(MSG, FROM, FROMUUID, TO) {
  var tmp = {};
  tmp["from"] = FROM;
  tmp["uuid"] = FROMUUID;
  tmp['fromip']=config.IP;
  tmp["to"] = TO;
  tmp["message"] = MSG;
  tmp['time'] = new Date().getTime();
  return tmp;
}

exports.sendMSGbyUID = sendMSGbyUID;
