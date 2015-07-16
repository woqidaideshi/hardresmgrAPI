var fs = require('fs');
var config = require('systemconfig');


/*
 * @method sendMSG
 *  根据IP和端口号来发送封装好的数据，若发送成功，则把成功发送的消息存至本地数据库中。若发送失败，则重新发送（循环5次）
 * @param IP
 *  目的方的IP地址
 * @param SENDMSG
 *  用encapsuMSG包装过的待发送消息
 *@param SentCallBack
 *发送方发送数据成功后的callback函数
 * @return JSON
 *  封装的包的内容
 */
function sendIMMsg(IP, SENDMSG, SentCallBack) {
  var CalBakMsg = {};
  CalBakMsg['MsgObj'] = SENDMSG;
  setTimeout(SentCallBack(CalBakMsg), 0);
}


function senderFunc(ACCOUNT, IPSET, MSG, TOAPP,SENTCALLBACK) {
  var tmpmsg = encapsuMSG(MSG, config.ACCOUNT, config.uniqueID, ACCOUNT,TOAPP);
  sendIMMsg(IPSET.IP, tmpmsg, SENTCALLBACK);
}

function sendMSGbyUID(IPSET, ACCOUNT, MSG,TOAPP, SENTCALLBACK) {
  if (typeof IPSET.UID == "undefined") {
    //console.log("receiver uuid null");
    /*
    here are some server msg send functions!
    */
  };
  //senderFunc(ACCOUNT, IPSET, MSG, TOAPP,SENTCALLBACK);
  var tmpMsg = encapsuMSG(MSG,  config.ACCOUNT, config.uniqueID, ACCOUNT,TOAPP);
  sendIMMsg(IPSET.IP, tmpMsg, SENTCALLBACK);
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
 * @param   FROMIP
 *  消息的发送方的IP
 * @param TO
 *  消息的接收方标识，可以是Account帐号
 * @return rply
 *  封装好，并且已经序列化的消息字符串
 */
function encapsuMSG(MSG, FROM, FROMUUID, TO,TOAPP) {
  var tmp = {};
  tmp["from"] = FROM;
  tmp["uuid"] = FROMUUID;
  tmp['fromip']=config.SERVERIP;
  tmp["to"] = TO;
  tmp["message"] = MSG;
  tmp['type'] = TOAPP;
  tmp['time'] = new Date().getTime();
  return tmp;
}

exports.sendMSGbyUID = sendMSGbyUID;
