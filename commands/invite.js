const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .addField("Invite Bot To your Server!", `[**Click Here!**](${`https://discordapp.com/oauth2/authorize?client_id=576953580288737280&scope=bot&permissions=2146958591`})`, true)
  .setFooter("All rights reserved ©ArilOfficial Development in 2019")
  .setColor("RANDOM")
  .addField("Support Server:", "https://discord.gg/NR7rHKS")
  .addField("Thanks For Invite Me","😊")
  message.channel.send(embed)
  
}