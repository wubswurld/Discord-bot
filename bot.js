//npm install discord.js & discord.js-commando

const Commando = require('discord.js-commando');
//client connects to server and handles details 
const bot = new Commando.Client();
const { RichEmbed } = require('discord.js');

//commands are catagorized into groups

bot.registry.registerGroup('info', 'Info about this server');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/Commands');

bot.on('ready', (message) => {
  bot.user.setActivity("WUBS WURLD", {type: "WATCHING"})
})
bot.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('Italy')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Goodbye ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('It cannot be done');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  // Do nothing if the channel wasn't found on this server
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Hello, ${member}`);
});

bot.on('message', message => {
    if (message.content === 'wubinfo') {
      const embed = new RichEmbed()
        .setTitle('This is wubinfo')
        .setColor('#8AF3FF')
        .setDescription('Hi, I am the bot built by wubs, I will kick you and ban you if you fuck with me');
      message.channel.send(embed);
    }
  });

bot.login(process.env.LOGIN_ID);