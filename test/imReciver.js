var im = require('../lib/im/im');

im.startReciver('imReciver', function(content) {
  console.log(content);
});
