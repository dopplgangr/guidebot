function get_progression(client, character, raid ) {
    return new Promise( (resolve, reject) => {
        const progress = {
            Normal:0,
            Heroic:0,
            Mythic:0,
            Total:0
        };
        client.blizzard.wow.character(["progression"], character).then( res => {
            var progression = res.data.progression;
            var target = progression.raids.find( (elem) => elem.name == raid );
            progress.Total = target.bosses.length;
            target.bosses.forEach( (elem) => {
                if( elem.normalKills > 0 ) progress.Normal +=1;
                if( elem.heroicKills > 0 ) progress.Heroic +=1;
                if( elem.mythicKills > 0 ) progress.Mythic +=1;
            });
            resolve(progress);
        }).catch( err => {
            reject(err);
        });
    });
}

function print_progress( raid, progress ) {
    return `${raid} Progress:\n Normal ${progress.Normal}/${progress.Total}\n Heroic ${progress.Heroic}/${progress.Total}\n Mythic ${progress.Mythic}/${progress.Total}`;
}

exports.run = async (client, message, args, level) => {
    var data = {
        name: args[0],
        realm: args[1]
    };
    var progress = await get_progression(client, data, "Uldir");
    // message.channel.send(print_progress("Uldir", progress));

    const embed = new client.RichEmbed()
        .setTitle("PvE Progress")
        .setColor(0xFF00FF)
        .setDescription(print_progress("Uldir", progress));
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["bnet", "wow"],
    permLevel: "User"
};

exports.help = {
    name: "progress",
    category: "Blizzard",
    description: "Show character progress.",
    usage: "progress [character] [realm]"
};
