const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const store = require('./models/dataAdapter').DS;
const fbAdapter = require('./models/dataAdapter').fbAdapter;

const bodyParser = require('body-parser');
const routes = require('./routes');
const handlers = require('./utils/handlers');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(`${__dirname}/public/`));
app.use('/', handlers.defaultErrorHandler);
app.use('/api', cors(handlers.corsOptions), routes.router);

io.on('connection', function (socket) {
	console.log('a user connected');

	var Galaxy = store.definitions['galaxy'];
	var ref = fbAdapter.ref.child(Galaxy.endpoint);

	ref.on('child_added', function (dataSnapshot) {

		var data = dataSnapshot.val();

		socket.emit('NewGalaxy', data);
	});

});

http.listen(port, function () {
	console.log(`Creating worlds on port: ${port}`);
})