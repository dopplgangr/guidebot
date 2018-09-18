module.exports = async (client, error) => {
  client.log.info(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
};
