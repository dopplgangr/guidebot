"use strict;"

class RaidProgress {
  constructor( name, normal, heroic, mythic, total){
    this.name = name; 
    this.normal = normal;
    this.heroic = heroic;
    this.mythic = mythic;
    this.total  = total;
  }

  toString() {
    return `\`Normal: ${this.normal} / ${this.total} Heroic: ${this.heroic} / ${this.total} Mythic: ${this.mythic} / ${this.total}\``
  }
};

class Character {
  constructor( res ) {
    this.name = res.data.name;
    this.realm = res.data.realm;
    this.level = res.data.level;
    this.ilvl = res.data.items.averageItemLevel;
    this.ilvlEq = res.data.items.averageItemLevelEquipped;
    this.avatar = "http://render-us.worldofwarcraft.com/character/" + res.data.thumbnail;

    this.raids = []

    var progression = res.data.progression;
    progression.raids.forEach( (raid) => {
      var normal = 0, heroic = 0 , mythic = 0, total = 0;
      total = raid.bosses.length;
      raid.bosses.forEach( (boss) => {
        if( boss.normalKills > 0 ) normal +=1;
        if( boss.heroicKills > 0 ) heroic +=1;
        if( boss.mythicKills > 0 ) mythic +=1;
      })
      this.raids.push(new RaidProgress(raid.name, normal, heroic, mythic, total));
    })
  }

  getRaidString( name ) {
    return this.raids.find( (elem) => elem.name == name).toString();
  }

  toString() {
    return `\`Name: ${this.name}\nRealm: ${this.realm}\nLevel: ${this.level}\nItem Level: ${this.ilvl} Equipped:${this.ilvlEq}\``
  }
}

function getCharacter(client, character ) {
  return new Promise(( resolve, reject ) => {
    client.blizzard.wow.character(["profile","items","progression"], character).then( res => {
      resolve(new Character(res));
    }).catch( err => {
      reject(err);
    });
  });
}

exports.run = async (client, message, args, level) => {
  var data = {
    name: args[0],
    realm: args[1]
  };

  var character = await getCharacter(client, data);

  message.channel.send({ embed:{ 
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "PvE Progression",
    thumbnail: {
      url: character.avatar
    },
    fields: [{
      name: "Character",
      value: character.toString()
    }, {
      name: "Uldir",
      value: character.getRaidString("Uldir")
    }
    ],
    timestamp: new Date()
  }});
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
