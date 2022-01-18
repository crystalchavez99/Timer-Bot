const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const prefix = "!";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  let channel = client.channels.cache.get("925835657505546283");
  channel.send("Hello, I am Timer-Bot!");
  channel.send(`To start your timer type: !start [minutes] [message]`);
});



client.on('message', function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();
  const remindMessage = args.splice(1).join(" ");

if(command === `start`){
    let numArgs = args.map(x => parseFloat(x));
    if(remindMessage){
      message.channel.send(`In ${numArgs} minutes(s), ${remindMessage}. Type !quit to end the timer midway.`)
    }else{
      message.channel.send(`In ${numArgs} minutes(s), I will ping you!`);
    }
    numArgs = numArgs * 60000;
    var timeout = setTimeout(function () {
      message.channel.send(`Timer is up! ${message.author}. Type !start [minutes] [message] to setup another time.`);
    }, numArgs);

  }else if(command === `quit`){
    message.channel.send(`Thank you for using break-time bot! ${message.author}`);
    clearTimeout(timeout);
  }
});



//make sure this line is the last line
 //login bot using token
client.login(config.CLIENT_TOKEN);
