const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let bug = args.join(" ").slice(0);
    if (!bug) return message.channel.send({
        embed: {
            description: `Please, enter your report!\n**EXAMPLE: ${message.prefix}bugreport (Your problem is written here!)**`
        }
    })
    let user = message.author.username;
    let guild = message.guild.name;
    let channel = client.channels.get("587530019270557726")
    let embed = new Discord.RichEmbed()
    .setTitle("Bug Report")
    .setThumbnail("https://cdn.discordapp.com/avatars/572975377291542540/31d7eb5ba3a63e76824acfc110e4776d.png?size=2048")
    .addField("Bug", bug)
    .addField("Reported By", user)
    .addField("Reported in", guild)
    .setColor("RANDOM")
    .setFooter("All rights reserved ©Tsuki Music Development in 2019")
    .setTimestamp()
    message.channel.send({
        embed: {
            description: `<:white_check_mark:432418492889694210> **| Your bug has been reported in the official server. It will be reviewed so please be patient.**`
        }
    })
    channel.send(embed).then(i => i.react("⏳"))
}