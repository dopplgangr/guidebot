// Here we load the config file that contains our token and our prefix values.
const config = require("./config.js");
const blizzard = require('blizzard.js').initialize({ apikey: client.config.blizzard_api_key, origin:client.config.blizzard_origin});
