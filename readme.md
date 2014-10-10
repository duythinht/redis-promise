# Promise wrapper for redis

Note: This project is not published to npmjs yet, just fetch the source code if you want to use.

## How to use:

	rp = require('./redis_promise');
	redis = require('redis');


	redisClient = redis.createClient()

	client = rp.wrapper(redisClient);

	//Set somekey
	client.set('hello', 'Hello World').then(client.set('lmao', 'blah blah'));

	//Get & output
	client.get('hello').then(function(data) {
		console.log(data); //Hello world
	}).then(client.get('lmao').then(function(data) {
		console.log(data); //blah blah
	}));
