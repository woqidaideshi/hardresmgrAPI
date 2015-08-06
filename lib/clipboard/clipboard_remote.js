/* @method dataTransProgress: Using websocket message to know the process of data transfer by monitoring 'datatrans' event.
 *  @para data: err, percentage, msg.
 *  @para callback: function to handle the reslut of the transfer status.
 */
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