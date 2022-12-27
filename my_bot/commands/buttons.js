const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('버튼')
        .setDescription('버튼 테스트'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('야')
            .setURL('https://github.com/ruka030809')
            .setDescription('이 개시발 새기야');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('대답.')
                    .setStyle('PRIMARY'),
            ).addComponents(
                new MessageButton()
                    .setCustomId('primary222')
                    .setLabel('대답.')
                    .setStyle('PRIMARY'),
            ).addComponents(
                new MessageButton()
                    .setCustomId('primary333')
                    .setLabel('대답.')
                    .setStyle('PRIMARY'),
            );
        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary2')
                    .setLabel('대답.')
                    .setStyle('SUCCESS'),
            );
        const row3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary3')
                    .setLabel('대답.')
                    .setStyle('PRIMARY'),
            );
        const row4 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary4')
                    .setLabel('대답.')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: '하', embeds: [embed], components: [row, row2, row3, row4] });
        if (!interaction.isButton()) return;
        console.log(interaction);
    },
};