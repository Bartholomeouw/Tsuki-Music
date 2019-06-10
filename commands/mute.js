const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
message.delete();
  
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("🚫 | You don't have `MANAGE_ROLES` permissions.");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(tomute === message.guild.member(message.author)) return message.channel.send("Are you retarted? Why do you wanna mute yourself?")
  if(!tomute) return message.reply("Couldn't find user.");
    let muterole = message.guild.roles.find(`name`, "Tsuki muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Tsuki muted",
        color: "none",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

await(tomute.addRole(muterole.id));
let reason = args.join(" ").slice(22)
  let Embed = new Discord.RichEmbed()
.setTitle("Mute")
.setColor("#fc6400")
.addField("User", tomute.user.tag)
.addField("Moderator", message.author.tag)
.addField("Reason", reason ? reason : "None")
.setTimestamp();
message.channel.send("✔️ **| That user has been muted.**")
let channel= message.guild.channels.find(`name`, 'mod-log')
if(!channel) return message.channel.send("<:x:432418492667396097> **| Can't find `mod-logs` channel.**")
  channel.send(Embed)
  }

module.exports.help = {
  name: "mute"
}