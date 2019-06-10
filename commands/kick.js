const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.reply("Can't find user!");
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**You don't have `KICK_MEMBERS` permissions.**")
  let kReason = args.join(" ").slice(22);
  if(!kReason) return message.reply("Please provide a reason!")

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#f45642")
  .addField("User", `${kUser}`)
  .addField("Moderator", `${message.author}`)
  .addField("Reason", `${kReason ? kReason : "None."}`)
  .setTimestamp();

  let kickChannel = message.guild.channels.find(`name`, 'mod-log');
  if(!kickChannel) return message.channel.send("<:x:432418492667396097> **| Can't find `mod-logs` channel.**");
   let embed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#f45642")
  .addField("User", kUser.user.tag)
  .addField("Moderator", message.author.tag)
  .addField("Time", message.createdAt.toLocaleString())
  .addField("Reason", `${kReason ? kReason : "None."}`);
message.channel.send("**That member is kicked.**")
kUser.kick(kReason)
kickChannel.send(kickEmbed);
try{kUser.send(embed)}catch(e) {message.channel.send("Unable to send message to user.")}

}

module.exports.help = {
  name: "?kick"
}