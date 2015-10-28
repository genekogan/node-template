var host = window.location.origin;

function start() {
	var socket = io.connect(host);

	// receive errors from debug-console.js via server.js
	socket.on('err', function(data) {
		//logError(data);
	});

	// did we receive a sketch?
	socket.on('getData', function (data) {
		console.log(data.data);
	});
};

function requestData() {
	var socket = io.connect(host);
	socket.emit('requestData');
}

function sendData() {
	var socket = io.connect(host);
	socket.emit('sendData', {myData:"data to server"});
}

window.onload = function() {
	
};

