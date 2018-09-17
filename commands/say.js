exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const arg_guild = args[0];
  const arg_channel = args[1];
  args = args.slice(2);

  const guild = client.guilds.find( elem => elem.name == arg_guild);
  const channel = guild.channels.find( elem => elem.name == arg_channel);

  if (!guild) {
    message.channel.send(`Guild: ${arg_guild} not found!`);
    return;
  }

  if(!channel) {
    message.channel.send(`Channel: ${arg_channel}, not found!`);
    return;
  }

  channel.send(args.join(" "));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "say",
  category: "Admin",
  description: "Send messages from the bot.",
  usage: "say [guild] [channel] [message]"
};
