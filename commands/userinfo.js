/*
  Create by : H29id
  Community : Discordbots Nation
*/

const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
  let member = message.guild.member(user)
  let uicon = user.displayAvatarURL;
  const uembed = new Discord.RichEmbed()
   .setAuthor(member.user.tag + " Information", uicon)
   .setColor("RANDOM")
   .setThumbnail(uicon)
   .addField(":small_blue_diamond: ID", member.user.id, true)
   .addField(":small_blue_diamond: Bot", member.user.bot, true)
   .addField(":small_blue_diamond: Created At", member.user.createdAt, true)
.setFooter("All rights reserved ©ArilOfficial Development in 2019")
   message.channel.send(uembed)
}

exports.help = {
  name: "userinfo"
}
