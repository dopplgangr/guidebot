const chalk = require("chalk");
const moment = require("moment");

class Logger {
    static log(content, type = "log") {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    switch (type) {
      case "log": {
        return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
      }
      case "info": {
        return console.log(`${timestamp} ${chalk.white(type.toUpperCase())} ${content} `);
      }
      case "warn": {
        return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
      }
      case "error": {
        return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
      }
      case "debug": {
        return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
      }
      case "trace": {
        return console.log(`${timestamp} ${chalk.bgGreen(type.toUpperCase())} ${content} `);
      }
      case "cmd": {
        return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
      }
      case "ready": {
        return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
      }
      default: throw new TypeError("Logger type must be one of [ log, info, warn, error, debug, trace, cmd, ready ].");
    }
  }
  static info(...args)  { this.log(...args, "info") }
  static warn(...args)  { this.log(...args, "warn") }
  static error(...args) { this.log(...args, "error") }
  static debug(...args) { this.log(...args, "debug") }
  static trace(...args) { this.log(...args, "trace") }
  static cmd(...args)   { this.log(...args, "cmd") }
  static ready(...args) { this.log(...args, "ready") }
}

module.exports = (client) => {
  client.log = Logger
}
