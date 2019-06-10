const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YOUTUBE);
const queue = new Map();
const opus = require("opusscript");
const gyp = require("node-gyp");
const fs = require("fs");
const moment = require("moment");
const cfg = require("../config.json");


exports.run = async(client, message, args, queue, color) => {
  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);

const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply('I\'m sorry but you need to be in a voice channel to play music!');
    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
      return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    } 
    if (!permissions.has('SPEAK')) {
      return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          
          
          const embed = new Discord.RichEmbed()
          .setTitle("💎 Song Selection 💎")
          .setDescription(`${videos.map(video2 => `**[${++index}]** \`${video2.title}\` `).join('\n')}`)
.setColor("RANDOM")
          .setFooter("Please provide a value to select one of the search results ranging from 1-10.")
          
          message.react("🆗")
          let msgtoDelete = await message.channel.send({embed: embed});
          // eslint-disable-next-line max-depth
          try {
            var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
              maxMatches: 1,
              time: 10000,
              errors: ['time']
            });
            msgtoDelete.delete();
          } catch (err) {
            console.error(err);
            const noPick = new Discord.RichEmbed()
            .setDescription("No or invalid value entered, cancelling video selection.")
.setColor("RANDOM")
            message.channel.send({embed: noPick});
            msgtoDelete.delete()
            return;
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return message.channel.send('🆘 I could not obtain any search results.');
        } 
      }
      return handleVideo(video, message, voiceChannel);
    }

    // Time for the functions

async function handleVideo(video, message, voiceChannel, playlist = true) {
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
  const song = {
    id: video.id,
     title: Discord.Util.escapeMarkdown(video.title),
     url: `https://www.youtube.com/watch?v=${video.id}`,
     uploadedby: video.channel.title,
     channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
     durationh: video.duration.hours,
     durationm: video.duration.minutes,
     durations: video.duration.seconds,
     request: message.author,
     channels: voiceChannel.name,
  };
  if (!serverQueue) {
    const queueConstruct = { 
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      skippers: [],
      songs: [],
      volume: 100,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return message.channel.send(`<:white_check_mark :460278161024745502> **${song.title}** has been added to the queue!`);
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            setTimeout(() => {
                play(guild, serverQueue.songs[0]);
            }, 100);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

    //Modified playing messages that give you the song duration!

    let durations = song.durations - 1
  var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
  var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
  if(song.durationh !== 0) {
    if(secondslength == 1 || secondslength == 0) {
      if(mlength == 1 || mlength == 0) {
      return serverQueue.textChannel.send(`🎶 Now playing:\n **${song.title}** (${song.durationh}:0${song.durationm}:0${durations})`);
  }}}
  if(song.durationh !== 0) {
    if(secondslength == 1 || secondslength == 0) {
      if(mlength !== 1 || mlength !== 0) {
        const embed2 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

      return serverQueue.textChannel.send(embed2);
    }}};
    if(song.durationh !== 0) {
      if(mlength == 1 || mlength == 0) {
        if(secondslength !== 1 || secondslength !== 0) {
          const embed3 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

        return serverQueue.textChannel.send(embed3);
    }}}
    if(song.durationh !== 0) {
      if(mlength !== 1 || mlength !== 0) {
        if(secondslength !== 1 || secondslength !== 0) {
          const embed4 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

        return serverQueue.textChannel.send(embed4);
    }}}
    if(song.durationh == 0 && song.durationm !== 0) {
      if(secondslength == 1 || secondslength == 0) {
          const embed5 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

        return serverQueue.textChannel.send(embed5);
    }}
    if(song.durationh == 0 && song.durationm !== 0) {
      if(secondslength !== 1 || secondslength !== 0) {
        const embed6 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

        return serverQueue.textChannel.send(embed6);
    }}
    if(song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {
        const embed7 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

      return serverQueue.textChannel.send(embed7);
    } else {
        const embed8 = new Discord.RichEmbed()
        .setDescription(`**Music:**\n[${song.title}](${song.url})`)
         .addField("Uploaded 🎬", `[${song.uploadedby}](${song.channelurl})`, true)
        .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
         .addField("Voice Channel 🎧", `${song.channels}`, true)
         .addField("Request :pencil:", `${message.author}`,true)
         .addField("ID :pencil:", `${message.id}`,true)
         .addField("Video ID :paperclips:", `${song.id}`,true)
         .addField("Duration :clock3:", `0${song.durationm}:${durations}`,true)
         .setFooter('Listen to music well and get a calm sensation and enjoy!', 'https://media.discordapp.net/attachments/546605082565804042/587502064586850314/61e6f8094cbe36621ee2a24bdc794fd0.png')
         .setTimestamp()

.setColor("RANDOM");

      return serverQueue.textChannel.send(embed8);
    }
}
}