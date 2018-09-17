const giphy = require('giphy-api')();

exports.run = ( client, message, args, level ) => {
    giphy.random({
        tag: 'kitten',
    }, (err, res) => {
        // Res contains gif data!
        const kittenURL = res.data.image_url;
        message.channel.send({ embed : {
            color: 3447003,
            author: { name: client.user.username, icon_url: client.user.avatarURL },
            title: ":cat2: | ** Here is your random kitten:**",
            url: kittenURL,
            image: { url: kittenURL },
            timestamp: new Date()
        }});
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kitten"],
  permLevel: "User"
};

exports.help = {
  name: "kitten",
  category: "Miscelaneous",
  description: "Displays a random kitten. Market research tells us that our users like cute animals.",
  usage: "kitten"
};
