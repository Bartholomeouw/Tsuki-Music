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
  .addField("t~>play", "Play url or search a video on youtube.")
    .addField("t~>np", "Shows what is playing right now.")
    .addField ("t~>stop", "Stop the currently playing song.")
    .addField("t~>queue", "Shows the queue.")
    .addField("t~>pause","pause the custome music.")
    .addField("t~>skip", "Skips the currently playing song.")
    .addField("t~>volume", "Set the volume of the song.")
    .addField("t~>resume", "Resume the paused song.")
    .addField("t~>bugreport","If you found a bug please report it using t~>bugreport",false)
  .addField("Support","| [Support Server](https://discord.gg/kcSv2yq) | [Vote](**Comginsoon**) | [Invite me to your Server](https://discordapp.com/oauth2/authorize?client_id=587229386294427668&scope=bot&permissions=2146958591) |")
  .setFooter("If you found a bug please report it using t~>bugreport","https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png")
  .setTimestamp()
  

  message.channel.send(embed).then(message => message.react('✔'))

}
module.exports.help = {
  name: "?help"
}