exports.run = (client, message, args, level) => {
    var achiev = client.blizzard.wow.boss()
        .then( response => { 
            for (boss in response.data.bosses)
                console.log(boss);
    })
    .catch( err => {
        console.log(err);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bnet", "wow"],
  permLevel: "User"
};

exports.help = {
  name: "blizzard",
  category: "Blizzard",
  description: "Testing the blizzard API.",
  usage: "blizzard [command]"
};
