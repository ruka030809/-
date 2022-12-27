const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('내정보')
        .setDescription('내 정보 출력'),
    async execute(interaction) {
        await interaction.reply(`${interaction.user.tag}님 ㅎㅇ요!!`);
    },
};
