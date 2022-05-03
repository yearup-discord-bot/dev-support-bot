const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('\t|------------|\n\t|            |\n\t|            |\n\t|            |\n\t|            |\n\t|------------|');
	},
};
