exports.dataTransProgress = function(callback, err, percentage, msg, ws) {
  var msg = {
    'Action': 'on',
    'Event': 'datatrans'
  };
  ws.on('datatrans', function(data) {
    if (typeof(data) !== 'object' || !data.hasOwnProperty('percentage')) {
      console.log("Can not get percentage messgae");
    } else {
      callback(null, data.percentage, data.msg);
    }
  });
  ws.send(msg);
}