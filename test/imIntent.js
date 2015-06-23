var Intent = require('../lib/im/im').Intent,
    intent = new Intent('imIntent', 'this is a test');

intent.send('imReciver', process.argv[2]);
