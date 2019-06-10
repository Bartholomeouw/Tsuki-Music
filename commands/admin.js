const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Moderation")
  .setDescription("__Tsuki Music at your service!__")
  
  .setColor("#f36278")
  .setTimestamp()
  .setURL('https://discord.gg/kcSv2yq')
  .setAuthor(`Tsuki Music`, "https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png")
  .setDescription(`Thanks you ${message.author} for using me!.`)
  .setThumbnail("https://media.giphy.com/media/ToMjGpQl18AemDAby3S/giphy.gif")
  .addField("t~>eval","Eval for user")
  .addField("t~>restart","Restart the bot")
  .addField("t~>reload","Reload the bot")
.addField("t~>sayd","same as say and it will remove your message **Administration needed**")
  .setFooter("Require mod-log channel.","https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png")
  .addField("Support","| [Support Server](https://discord.gg/kcSv2yq) | [Vote](**Comginsoon**) | [Invite me to your Server](https://discordapp.com/oauth2/authorize?client_id=587229386294427668&scope=bot&permissions=2146958591) |")

  

  message.channel.send(embed).then(message => message.react('✔'))

}
module.exports.help = {
  name: "?help"
}