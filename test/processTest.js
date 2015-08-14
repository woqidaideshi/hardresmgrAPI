var usage = require('../lib/process/processwatcher.js');
/*
  测试说明：
  首先在终端中输入 top命令，查看占用CPU使用率最高的几个进程ID（也可以新建一个空while循环测试）
  记录待观察的进程ID号，然后替换下文中的27164,27255,9894三个进程号
  执行测试脚本后，为地一个进程添加a和a1两个监听回调函数，为第二个和第三个进程分别添加一个回调函数。
  执行10秒之后，将地一个进程的监听回调函数移除
  执行12秒后，将第二个进程的监听移除
  执行14秒后，将第三个进程的监听移除
*/
var processinfo = usage.getProcessInfo();

var a = function(num) {
  console.log("a", num);
}

var a1 = function(num) {
  console.log("this is the second watcher for a :", num);
}

var b = function(num) {
  console.log("b", num);
}

var c = function(num) {
  console.log("c", num);
}

processinfo.addPidListener(a, 27164);

processinfo.addPidListener(a1, 27164);

processinfo.addPidListener(b, 27255);

processinfo.addPidListener(c, 9894);

setTimeout(function() {
  console.log("Removing a");
  processinfo.removePidListener(a, 27164);
  processinfo.removePidListener(a1, 27164);
}, 10000);

setTimeout(function() {
  console.log("Removing b");
  processinfo.removePidListener(b, 27255);
}, 12000);

setTimeout(function() {
  console.log("Removing c");
  processinfo.removePidListener(c, 9894);
}, 14000);