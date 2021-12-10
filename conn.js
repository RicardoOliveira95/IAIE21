var hdb    = require('hdb');
var client = hdb.createClient({
  host     : 'hostname',
  port     : 30015,
  user     : 'user',
  password : 'secret'
});
client.on('error', function (err) {
  console.error('Network connection error', err);
});
client.connect(function (err) {
  if (err) {
  	return console.error('Connect error', err);
  }
  client.exec('select * from DUMMY', function (err, rows) {
	client.end();
    if (err) {
      return console.error('Execute error:', err);
    }
    console.log('Results:', rows);
  });
});
