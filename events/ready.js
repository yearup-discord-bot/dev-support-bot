// 'ready' this event is called when the client is ready to receive and create interactions

// module.exports allows us to use require('ready.js') to load this chunk of code into a variable in another file
module.exports = {

	name: 'ready',	// the name of the event to register this module to

	once: true,		// in this case this event can only be responded to ONCE

	// the following function is what will be executed once our bot is notified of this event occurring
	execute(client) {
		// log out to the console the following message telling the world that ITS ALIVE!!!
		console.log(`${client.user.tag} ready!`);
	}
};
