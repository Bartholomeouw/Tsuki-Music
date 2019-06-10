/*
  Create by : H29id
  Community : Discordbots Nation
*/

const Discord = require("discord.js")

exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
  let member = message.guild.member(user)

  const avaembed = new Discord.RichEmbed()
  .setAuthor(`${member.user.username}'s Avatar!`)
  .addField(`:small_blue_diamond: Avatar Link`, `[Click Me](${member.user.avatarURL})`)
  .setImage(member.user.displayAvatarURL)
  .setColor("RANDOM")
.setFooter("All rights reserved ©ArilOfficial Development in 2019")
  message.channel.send(avaembed);
}

exports.help = {
  name:"avatar"
}
