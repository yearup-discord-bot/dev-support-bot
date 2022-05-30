// 'ready' this event is called when the client is ready to receive and create interactions

// module.exports allows us to use require('ready.js') to load this chunk of code into a variable in another file
module.exports = {

	name: 'ready',	// the name of the event to register this module to

	once: true,		// in this case this event can only be responded to ONCE

	// the following function is what will be executed once our bot is notified of this event occurring
	execute(client) {

		// get a handle to the statically defined channel in config for the dev console output
		const { debugChannelID } = require('../config.json');
		client.debugChannel = client.channels.cache.get( debugChannelID );

		if ( client.debugChannel )
		{
			const http = require('node:http');	
			const hostname = '127.0.0.1';
			const port = '5656';

			const server = http.createServer((req, res) => {
				let body = '';

				req.on('data', chunk => {
					body += chunk.toString(); // convert Buffer to string
				});

				req.on('end', () => {
					client.debugChannel.send(body);
				});
			});

			server.listen(port, hostname, () =>{
				console.log(`Listening for log messages at http://${hostname}:${port}`);
			});
		}

		// log out to the console the following message telling the world that ITS ALIVE!!!
		console.log(`${client.user.tag} ready!`);
	}
};
