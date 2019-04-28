const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('message', (message) => {
    //everytime a message is sent run this callback
    if (message.content == 'wubinfo') {
        message.reply('Hi, I am the bot built by wubs, I will kick you and ban you if you fuck with me')
    }
})

bot.login('NTcxOTUzOTExOTA1Mzg2NTE2.XMVPwA.xtZfQDpt91kDIHiW3NXJ5zfP_N0');