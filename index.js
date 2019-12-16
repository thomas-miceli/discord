const Discord = require('discord.js');
const Client = new Discord.Client();

require('dotenv').config();

/* Actions */

/* Events */
Client.on('ready', () => {
    console.log('Bot ready');
})

Client.on('guildCreate', (guild) => {
    console.log('New server');
});

Client.on('message', async (message) => {
});


Client.login(process.env.SECRET);