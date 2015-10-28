var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
	console.log("Initialize Socket");

	// this is a request
  socket.on('requestData', function () {
    socket.emit('getData', {data:"hello world"});
  });    
 
  socket.on('sendData', function (data) { 
    console.log('received data '+data.myData);
  });    
 
  // error handling
  socket.on('err', function (data) {
  	if (data.msg === prevErr.msg && data.num === prevErr.num) {
    	// do nothing
  	} else {
    	socket.broadcast.emit('err', data);
    	prevErr = data;
	   }
  });
});

app.use(express.static(__dirname + '/public'));

server.listen(process.env.PORT || 5000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});
