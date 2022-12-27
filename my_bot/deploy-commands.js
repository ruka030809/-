const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildIds, token } = require('./config.json');


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    guildIds.map(async (guildId) => {
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
            console.log(`${guildId} 서버 성공`);
        }
        catch (error) {
            console.error(error);
        }
    });

    try {
        await rest.put(Routes.applicationCommands(clientId), { body: commands, });
        console.log(`글로벌 명령어 등록 성공`);
    }
    catch (error) {
        colsole.error(error);
    }
})();


