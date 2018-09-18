// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.log.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};
