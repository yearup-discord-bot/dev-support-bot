// load in required modules for logging and filesystem manipulation
const fs = require('node:fs');
require('log-timestamp');

// require the necessary discord.js modules
dfconst { Client, Collection, Intents } = require('discord.js');

// load the unique, secure, super secret token from the config.json file...
dfconst { guildId, clientId, token, devLogChannelId, releaseLogChannelId } = require('./config.json');


// create a new client instance, this represents our bot in code or bot is a client connecting to a discord server
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

if ( devLogChannelId ) {
	client.devLogChannelId = devLogChannelId;
}

if ( releaseLogChannelId ) {
	client.releaseLogChannelId = releaseLogChannelId;
}

/*************************************/
/* L O A D  C O M M A N D  F I L E S */
/*************************************/

// the following will search for all commands in ./commands and load them as modules


// attach a new collection that will hold commands to client
client.commands = new Collection();

// load files from the dir ./commands using filter
// filter to only javascript files (ends with '.js')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// loop thru all the files
for (const file of commandFiles) {

	// load the file (module) into command
	const command = require(`./commands/${file}`);

	// set a new item in the collection
	// with the command name as the key and the exported module (code to execute) as the value
	client.commands.set(command.data.name, command);
}


/*********************************/
/* L O A D  E V E N T  F I L E S */
/*********************************/

// same exact concept as the section above that reads command files!
// except for...

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);

	// THE FOLLOWING! We aren't loading commands we are creating event listeners...
	// that means we are linking events, by name, to code that will be executed once the event occurs
	// the name, whether it can run multiple times, and the code to execute are all contained in each file per event
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

	/*	FURTHER EXPLANATION OF EVENT MODULES AND THEIR COMPONENTS
		The event modules we are loading have a very specific structure to them
		They all have three components (key/value pairs): name, once, and execute

			name -
				this is where we specify the type of event by name that we are registering a function for
				when an event occurs it notifies our bot of the type of event it is by name
				if there is an event of this type registered with our bot (client) then it will call the appropriate function

			once -
				a boolean(true/false) telling the bot whether it can respond to this type of event 

			execute -
				the function that is to be executed upon this event occurring	*/
}


// login to Discord with your client's token
client.login(token);
