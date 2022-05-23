// 'ready' this event is called when the client is ready to receive and create interactions

// module.exports allows us to use require('ready.js') to load this chunk of code into a variable in another file
module.exports = {

	name: 'ready',	// the name of the event to register this module to

	once: true,		// in this case this event can only be responded to ONCE

	// the following function is what will be executed once our bot is notified of this event occurring
	execute(client) {

		const Tail = require('tail-file');
		const fs = require('node:fs');

		const {execSync} = require('child_process');
		// get the date to use as the name for the current days log
		// need to cut out the last trailing newline character to avoid mucking up the file name
		const stdout = execSync('date +%m-%d-%y | tr -d "\n"');

		// get a handle to the statically defined channel in config for the dev console output
		client.debugLogChannel = client.channels.cache.get(client.debugLogChannelId);

		if ( client.debugLogChannel )
		{
		if ( !fs.existsSync(`../logs/${stdout}.log`) )
			fs.writeFile( `../logs/${stdout}.log`, '---- BEGIN LOG ----\n', () => {} )
	
			// the default folder for logs will be in the up one level in a folder call 'logs'
			client.debugLogTail = new Tail(`../logs/${stdout}.log`, { force: true }, line => {
				// each time a new line is read the content is sent to the dev log channel
				// IF there is actual data to send otherwise discord.js craps out
				// crying about not being able to send an empty string :'(
				if ( line.length > 0 )
					client.debugLogChannel.send( line );
			});
		}

		// log out to the console the following message telling the world that ITS ALIVE!!!
		console.log(`${client.user.tag} ready!`);
	}
};
