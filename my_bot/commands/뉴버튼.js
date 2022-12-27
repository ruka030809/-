const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('뉴버튼')
        .setDescription('뉴버튼 제작'),
    async execute(interaction) {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("test1")
                .setLabel("첫번째")
                .setStyle("PRIMARY")
        );
        await interaction.reply({ content: '버튼...', components: [row] });

        const filter = (interaction) => {
            return interaction.customId === "test1";
        }
        //만들었다고 적용되는건 아님
        const collector = interaction.channel.createMessageComponentCollector({
            //몇초동안 반응 할 수 있는지
            filter: filter, //앞 뒤꺼 같으면 생략가능 filter만 적어도됨
            time: 10 * 1000, // ms 단위임
        });

        collector.on("collect", async (interaction) => {
            //버튼을 클릭했을때 수행
            if (interaction.customId === "test1") {
                await interaction.reply(`${interaction.user.tag} <--이세끼가 test 1버튼 클릭함`);
            }
        });

        collector.on("end", async (collect) => {
            console.log("버튼 시간 초과");
        })

    },
};