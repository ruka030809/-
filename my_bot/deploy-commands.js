const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [
    // new SlashCommandBuilder().setName('야').setDescription('뭐이씨빨이라고 대답'),
    // new SlashCommandBuilder().setName('서버').setDescription('서버 정보 출력함'),
    // new SlashCommandBuilder().setName('내정보').setDescription('본인 정보 출력'),
]
    .map(command => command.toJSON());

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('성공했습니다.'))
    .catch(console.error);