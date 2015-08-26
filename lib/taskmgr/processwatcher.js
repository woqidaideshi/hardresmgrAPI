var fs = require('fs');

var ECHOTIME = 1500;

var _getUsage = function(cb, pid) {
  fs.readFile("/proc/" + pid + "/stat", function(err, data) {
    if (err) {
      console.log("Please input the right pid number. ");
      console.log("Detailed info :");
      console.log(err);
      return;
    }
    var elems = data.toString().split(' ');
    var utime = parseInt(elems[13]);
    var stime = parseInt(elems[14]);
    cb(utime + stime);
  });
}

function ProcessInfo() {
  this.pidarray = [];
  this.interval = null;
}


/**
 * @description
 *    Start to calculate the usage of CPU for pid .
 *    This function is called  after addPidListener and make sure the pidarray is not empty
 * @param
 *    param1: pid
 *      @description
 *        the process id number 
 * @return
 *    null
 */
ProcessInfo.prototype._startWatch = function(pid) {
  var self = this;
  for (var i = 0; i < self.pidarray.length; i++) {
    if (self.pidarray[i].pid == pid && self.pidarray[i].interval !== null) {
      return;
    } else if (self.pidarray[i].pid == pid && self.pidarray[i].interval == null) {
      self.pidarray[i].interval = setInterval(function() {
        _getUsage(function(startTime) {
          setTimeout(function() {
            _getUsage(function(endTime) {
              var delta = endTime - startTime;
              var percentage = 100 * (delta / (ECHOTIME/10));
              if (percentage > 100) {
                percentage = 100;
              }
              self._doAction(pid, percentage);
            }, pid);
          }, ECHOTIME);
        }, pid);
      }, ECHOTIME);
    }
  }
}

/**
 * @description
 *    stop watching  the usage of CPU for pid .
 *    This function is called  in  removePidListener and if the pidarray element is deleted 
 *   this function is called
 * @param
 *    param1: pid
 *      @description
 *        the process id number 
 * @return
 *    null
 */
ProcessInfo.prototype._stopWatch = function(pid) {
  var self = this;
  for (var i = 0; i < self.pidarray.length; i++) {
    if (self.pidarray[i].pid == pid) {
      clearInterval(self.pidarray[i].interval);
      break;
    }
  }
}

/**
 * @description
 *    check Empty pid
 * @param
 *    null
 * @return
 *    bool
 */
ProcessInfo.prototype._checkempty = function() {
  var self = this;
  if (self.pidarray.length == 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * @description
 *    Add callback functions for process of pid
 * @param
 *    param1: a callback function -> Function
 *      @description
 *        a callback function for showing CPU use percentage of Process pid
 *      @param
 *        param1: the return percent -> integer
 *        not more than 100
 * @return
 *    null
 */
ProcessInfo.prototype.addPidListener = function(callback, pid) {
  var self = this;
  for (var i = self.pidarray.length - 1; i >= 0; i--) {
    if (self.pidarray[i].pid == pid) {
      self.pidarray[i].cb.push(callback);
      return;
    }
  }
  var temp = {};
  temp.pid = pid;
  temp.cb = [];
  temp.cb.push(callback);
  temp.interval = null;
  self.pidarray.push(temp);
  self._startWatch(pid);
}

/**
 * @description
 *    Remove callback functions for process of pid
 * @param
 *    param1: a callback function -> Function
 *      @description
 *        the function to be removed in pidarray
 *      @param
 *        param1: the return percent -> integer
 *        not more than 100
 * @return
 *    null
 */
ProcessInfo.prototype.removePidListener = function(callback, pid) {
  var self = this;
  var flag = 0;
  var cbflag = 0;
  var emptyflag = -1;
  for (var i = self.pidarray.length - 1; i >= 0; i--) {
    if (self.pidarray[i].pid == pid) {
      flag = 1;
      var tempcb = self.pidarray[i].cb;
      for (var j = 0; j < tempcb.length; j++) {
        if (tempcb[j] == callback) {
          cbflag = 1;
          tempcb.splice(j, 1);
          if (tempcb.length == 0) {
            self._stopWatch(self.pidarray[i].interval);
            emptyflag = i;
          }
          break;
        }
      };
      self.pidarray[i].cb = tempcb;
      break;
    }
  };
  if (flag == 0) {
    console.log("no pid in pidarray.");
  } else if (cbflag == 0) {
    console.log("no callback in pidarray");
  }
  if (emptyflag !== -1) {
    self.pidarray.splice(emptyflag, 1);
  }
}

/**
 * @description
 *    do registered callback in pidarray
 * @param
 *    param1: pid -> integer
 *      @description
 *        indecates what callbacks to call
 *    param2: usage -> integer
 *      @description
 *        indecates the usage of pid process 
 * @return
 *    null
 */
ProcessInfo.prototype._doAction = function(pid, usage) {
  var self = this;
  for (var i = 0; i < self.pidarray.length; i++) {
    if (self.pidarray[i].pid == pid) {
      var tempcb = self.pidarray[i].cb;
      for (var i = 0; i < tempcb.length; i++) {
        tempcb[i](usage);
      }
      break;
    }
  }
  //self._echo();
}

//_echo function for testing
ProcessInfo.prototype._echo = function() {
  var self = this;
  if (self._checkempty() == false) {
    console.log("Empty Queue");
    return;
  };
  for (var i = 0; i < self.pidarray.length; i++) {
    console.log(self.pidarray[i].pid);
    console.log(self.pidarray[i].cb);
  };
  console.log("=======================");
}

var infoObj = null;
exports.getProcessInfo = function() {
  if (infoObj == null) {
    infoObj = new ProcessInfo();
  }
  return infoObj;
}