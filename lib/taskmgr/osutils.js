var _os = require('os');

/**
 * @method platform
 *   获取本机的平台
 *
 * 返回值：平台信息，在Linux下显示Linux字符串
 */
exports.platform = function() {
    return process.platform;
}

/**
 * @method cpuCount
 *   获取本机CPU核数
 *
 * 返回值：本机CPU核数，对于Intel的超线程也会显示为单独的核
 */
exports.cpuCount = function() {
    return _os.cpus().length;
}

/**
 * @method sysUptime
 *   获取系统运行时间
 *
 * 返回值：本机系统运行时间，以秒为单位
 */
exports.sysUptime = function() {
    //seconds
    return _os.uptime();
}

/**
 * @method processUptime
 *   获取进程运行时间
 *
 * 返回值：node进程运行的时间，以秒为单位
 */
exports.processUptime = function() {
    //seconds
    return process.uptime();
}



/**
 * @method freemem
 *   获取系统空闲内存
 *
 * 返回值：系统空闲内存量，单位是兆b
 */
exports.freemem = function() {
    return _os.freemem() / (1024 * 1024);
}

/**
 * @method totalmem
 *   获取系统总内存
 *
 * 返回值：系统总内存量，单位是兆b
 */
exports.totalmem = function() {

    return _os.totalmem() / (1024 * 1024);
}

/**
 * @method freememPercentage
 *   获取系统总空闲内存百分比
 *
 * 返回值：系统空闲内存百分比
 */
exports.freememPercentage = function() {
    return _os.freemem() / _os.totalmem();
}

/**
 * @method freeCommand
 *   获取系统总空闲内存大小，通过free命令返回值截取，统计了系统分配但未使用的buffer、cache与
 * 未被分配的内存值，统计的更精确
 *
 * @param1 callback function(err, res)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      res : 剩余内存大小
 */
exports.freeCommand = function(callback) {

    // Only Linux
    require('child_process').exec('free -m', function(error, stdout, stderr) {

        var lines = stdout.split("\n");
        var str_mem_info = lines[1].replace(/[\s\n\r]+/g, ' ');
        var mem_info = str_mem_info.split(' ')
        total_mem = parseFloat(mem_info[1])
        free_mem = parseFloat(mem_info[3])
        buffers_mem = parseFloat(mem_info[5])
        cached_mem = parseFloat(mem_info[6])

        used_mem = total_mem - (free_mem + buffers_mem + cached_mem)

        if (error) {
            callback(error,used_mem - 2);
        }else{
            callback(null,used_mem - 2);
        }
    });
}


/**
 * @method harddrive
 *   获取系统分区大小
 *
 * @param1 callback function(err, total,free,used)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      total : 总分区大小
 *  @cbparam3 
 *      free : 空闲大小
 *  @cbparam4
 *      used : 使用大小
 */
exports.harddrive = function(callback) {

    require('child_process').exec('df -k', function(error, stdout, stderr) {

        var total = 0;
        var used = 0;
        var free = 0;

        var lines = stdout.split("\n");

        var str_disk_info = lines[1].replace(/[\s\n\r]+/g, ' ');

        var disk_info = str_disk_info.split(' ');

        total = Math.ceil((disk_info[1] * 1024) / Math.pow(1024, 2));
        used = Math.ceil(disk_info[2] * 1024 / Math.pow(1024, 2));
        free = Math.ceil(disk_info[3] * 1024 / Math.pow(1024, 2));

        if (error) {
            callback(error,total, free, used);
        }else{
            callback(null,total, free, used);
        }
        
    });
}



/**
 * @method getProcesses
 *   获取当前运行进程信息
 *
 *  @param1 callback function(err, result)
 *   回调函数
 *   @cbparam1
 *      err: error object, string or just null
 *   @cbparam2
 *      result : 运行的进程信息
 *  @param2 nProcess
 *      要显示的进程数量
 */
exports.getProcesses = function(callback,nProcess) {

    // if nprocess is undefined then is function
    if (typeof nProcess === 'function') {

        callback = nProcess;
        nProcess = 0
    }

    command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + 10
        //command = 'ps aux | head -n '+ 11
        //command = 'ps aux | head -n '+ (nProcess + 1)
    if (nProcess > 0)
        command = 'ps -eo pcpu,pmem,time,args | sort -k 1 -r | head -n' + (nProcess + 1)

    require('child_process').exec(command, function(error, stdout, stderr) {

        var that = this

        var lines = stdout.split("\n");
        lines.shift()
        lines.pop()

        var result = ''


        lines.forEach(function(_item, _i) {

            var _str = _item.replace(/[\s\n\r]+/g, ' ');

            _str = _str.split(' ')

            // result += _str[10]+" "+_str[9]+" "+_str[2]+" "+_str[3]+"\n";  // process               
            result += _str[1] + " " + _str[2] + " " + _str[3] + " " + _str[4].substring((_str[4].length - 25)) + "\n"; // process               

        });
        if (error) {
            callback(error,result);
        }else{
            callback(null,result);
        }
    });
}



/*
 * Returns All the load average usage for 1, 5 or 15 minutes.
 */
exports.allLoadavg = function() {

    var loads = _os.loadavg();

    return loads[0].toFixed(4) + ',' + loads[1].toFixed(4) + ',' + loads[2].toFixed(4);
}

/*
 * Returns the load average usage for 1, 5 or 15 minutes.
 */
exports.loadavg = function(_time) {

    if (_time === undefined || (_time !== 5 && _time !== 15)) _time = 1;

    var loads = _os.loadavg();
    var v = 0;
    if (_time == 1) v = loads[0];
    if (_time == 5) v = loads[1];
    if (_time == 15) v = loads[2];

    return v;
}

/**
 * @method cpuFree
 *   获取下一秒CPU总体使用率大小
 *
 * @param1 callback function(usage)
 *   回调函数
 *   @cbparam
 *      usage : CPU使用率，值为0-1之间的浮点数
 */
exports.cpuFree = function(callback) {
    getCPUUsage(callback, true);
}

/**
 * @method cpuFree
 *   获取下一秒CPU总体空闲率大小
 *
 * @param1 callback function(usage)
 *   回调函数
 *   @cbparam
 *      usage : CPU空闲率，值为0-1之间的浮点数
 */
exports.cpuUsage = function(callback) {
    getCPUUsage(callback, false);
}

function getCPUUsage(callback, free) {

    var stats1 = getCPUInfo();
    var startIdle = stats1.idle;
    var startTotal = stats1.total;

    setTimeout(function() {
        var stats2 = getCPUInfo();
        var endIdle = stats2.idle;
        var endTotal = stats2.total;

        var idle = endIdle - startIdle;
        var total = endTotal - startTotal;
        var perc = idle / total;

        if (free === true)
            callback(perc);
        else
            callback((1 - perc));

    }, 1000);
}

function getCPUInfo(callback) {
    var cpus = _os.cpus();

    var user = 0;
    var nice = 0;
    var sys = 0;
    var idle = 0;
    var irq = 0;
    var total = 0;

    for (var cpu in cpus) {

        user += cpus[cpu].times.user;
        nice += cpus[cpu].times.nice;
        sys += cpus[cpu].times.sys;
        irq += cpus[cpu].times.irq;
        idle += cpus[cpu].times.idle;
    }

    var total = user + nice + sys + idle + irq;

    return {
        'idle': idle,
        'total': total
    };
}