const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('야')
		.setDescription('뭐이씨빨이라고 대답'),
	async execute(interaction) {
		await interaction.reply('뭐이씨1빨');
	},
};