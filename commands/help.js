const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("List of Commands.")
  .setDescription("__Tsuki Music at your service!__")
  
  .setColor("#f36278")
  .setTimestamp()
  .setURL('https://discord.gg/kcSv2yq')
  .setAuthor(`Tsuki Music`, "https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png")
  .setDescription(`Thanks you ${message.author} for using me! \n We love the community.`)
  .setThumbnail("https://media.giphy.com/media/ToMjGpQl18AemDAby3S/giphy.gif")
  .addField ("t~>music","**__Music commands active, paying music with me.__**")
  .addField("t~>main","**Display all __main__ commands**.", false)
  .addField("t~>mod","**Display all __mods__ commands**", false)
  .addField("t~>admin","**Display all __admin__ commands**")

  .addField("Support","| [Support Server](https://discord.gg/kcSv2yq) | [Vote](**Comginsoon**) | [Invite me to your Server](https://discordapp.com/oauth2/authorize?client_id=587229386294427668&scope=bot&permissions=2146958591) |")
  .setFooter("If you found a bug please report it using t~>bugreport","https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png")
  

  message.channel.send(embed).then(message => message.react('✔'))

}
module.exports.help = {
  name: "?help"
}