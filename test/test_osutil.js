/*
var os = require("os"),
  cpus = os.cpus();

for (var i = 0; i < cpus.length; i++) {
  console.log("CPU %s :",i);
  var cpu = cpus[i], total = 0;
  for(type in cpu.times)
    total += cpu.times[type];

  for(type in cpu.times)
    console.log("\t",type,Math.round(100* cpu.times[type] / total));
};
*/

var os = require('../lib/taskmgr/osutils');

os.cpuUsage(function(v) {
  console.log('CPU Usage (%): ' + v);
});

os.cpuFree(function(v) {
  console.log('CPU Free (%): ' + v);
});

console.log(os.platform());

console.log("CPU cores : " + os.cpuCount());

console.log("Free memory: " + os.freemem());

console.log("Total memory: " + os.totalmem());

console.log("Free mem usage: " + os.freememPercentage());

os.freeCommand(function(err, v) {
  if (err) {
    console.log(err);
  } else {
    console.log("memory used accurate: " + v);
  }
})

os.harddrive(function(err, total, free, used) {
  if (err) {
    console.log(err);
  } else {
    console.log("Total hard disk space: " + total);
    console.log("Free hard disk space: " + free);
    console.log("Used hard disk space: " + used);
  }
});

os.getProcesses(5, function(err, v) {
  if (err) {
    console.log(err);
  } else {
    console.log(v);
  }
});
