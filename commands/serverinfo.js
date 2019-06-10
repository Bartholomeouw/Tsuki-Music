/*
  Create by : H29id
  Community : Discordbots Nation
*/

const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  const serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setColor("RANDOM")
   .setThumbnail(sicon)
   .addField(":small_blue_diamond: ID", message.guild.id, true)
   .addField(":small_blue_diamond: Name", message.guild.name, true)
   .addField(":small_blue_diamond: Owner", message.guild.owner.user.toString(), true)
   .addField(":small_blue_diamond: Region", message.guild.region, true)
   .addField(":small_blue_diamond: You Joined", message.member.joinedAt)
.setFooter("All rights reserved ©ArilOfficial Development in 2019")
   message.channel.send(serverembed)
}

exports.help = {
  name: "serverinfo"
}
