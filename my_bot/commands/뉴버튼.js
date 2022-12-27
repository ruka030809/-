const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, Message } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('뉴버튼')
        .setDescription('뉴버튼 제작'),
    async execute(interaction) {


        const buttons = [
            {
                customId: "test1",
                label: "첫번째",
                style: "PRIMARY",
                async action(interaction) {
                    await interaction.reply(`${interaction.user.tag} <--이세끼가 test 1버튼 클릭함`);

                }
            },
            {
                customId: "test2",
                label: "두번째",
                style: "SECONDARY",
                async action(interaction) {
                    await interaction.update({
                        content: "버튼2누름",
                        components: [],
                    })

                }
            },
        ];

        const row = new MessageActionRow().addComponents(
            buttons.map((button) => {
                return new MessageButton()
                    .setCustomId(button.customId)
                    .setLabel(button.label)
                    .setStyle(button.style);
            })
        );
        await interaction.reply({ content: '버튼...', components: [row] });

        const filter = (interaction) => {
            return buttons.filter(
                button => button.customId === interaction.customId
            )
            //return interaction.customId === "test1" || "test2";
        }
        //만들었다고 적용되는건 아님
        const collector = interaction.channel.createMessageComponentCollector({
            //몇초동안 반응 할 수 있는지
            filter: filter, //앞 뒤꺼 같으면 생략가능 filter만 적어도됨
            time: 10 * 1000, // ms 단위임
        });

        collector.on("collect", async (interaction) => {
            // 배열에 있는 동작을 자동으로 읽음
            const button = buttons.find(
                button => button.customId === interaction.customId
            );
            await button.action(interaction);
        });


        collector.on("end", async (collect) => {
            console.log("버튼 시간 초과");
            await interaction.deleteReply();
        })

    },
};