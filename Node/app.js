const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

const app = express();
const port = 3001;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
	res.json('Hello World');
});

/* more code to be added later */
let secret = 'some_secret'; // a secret key is set here

/* Create token to be used */
app.get('/token/sign', (req, res) => {
	var userData = {
		name: 'My Name',
		id: '1234',
	};
	let token = jwt.sign(userData, secret, { expiresIn: '86400s' });
	//res.send(token);

	const config = {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	};
	res.send(config);

	// res.status(200).json({"token": token});
});

app.use(
	expressJWT({ secret: secret, algorithms: ['HS256'] }).unless(
		// This allows access to /token/sign without token authentication
		{ path: ['/token/sign'] }
	)
);

app.get('/path1', (req, res) => {
	res.status(200).json({
		success: true,
		msg: 'Secret Access Granted',
	});
});

/* the listen function */
app.listen(port, function () {
	console.log('Listening to ' + port);
});
