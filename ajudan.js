// created by idabgsram

var Discord = require('discord.io');
var tokenfile = 'bottoken';
var auth = require('./' + tokenfile + '.json');

// bot information | ganti disini
var botname = 'botname'; // nama bot
var botauth = 'botauth'; // yg buat bot
var botver = '0.0.1'; // versi bot
var botperintah = 'bot'; //perintah awal bot
var botrd = '11-09-2018'; //tanggal buat bot

//greeting
const tokencheck = require('./' + tokenfile).token;
const newUsers = [];
	console.log('Welcome to the ' + botname + ' Console!');
	console.log('Please wait while this crap javascript doing his work');
	console.log('Accessing token...');
if (tokencheck == 'insert-token-here') {
		console.log(" Token not found, please edit the " + tokenfile + ".json file")
		process.exit();
	}
	
var ajudan = new Discord.Client({
   token: auth.token,
   autorun: true
});
ajudan.on('ready', function (evt) {
	   console.log('Token Authorized');
	console.log(' ');
    console.log('bot is online');
    console.log('Connected to bot : ' + ajudan.username + ' - (' + ajudan.id + ')');
});

ajudan.on('message', function (user, userID, channelID, message, evt) {

if (message.substring(0, botperintah.toString().length + 1).toLowerCase() == botperintah + ' ') {
	        var args = message.substring(botperintah.toString().length + 1).toLowerCase().split(' ');
        var cmd = args[0];
		args = args.splice(1);
   switch(cmd.toLowerCase()) {
            // !ping
			case 'about':
                ajudan.sendMessage({
                    to: channelID,
                    message: 'About ' + botname + '\nCreated by ' + botauth + '\nVersion : ' + botver + '\nRelease Date : ' + botrd
                });
			break;
			// copy case - break, ganti 'ping' sama perintah, 'pong' sama jawaban.
            case 'ping':
                ajudan.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
			//
			case 'list':
					ajudan.sendMessage({
                    to: channelID,
                    message: botname + ' Command List :\n-about\n-ping\n-list'
                });
            break;
			default:
			        ajudan.sendMessage({
                    to: channelID,
                    message: 'Oops! command not found! please type "' + botperintah + ' list" to check the bot list'
                });
            break;
         }
} 
   
});

ajudan.on('guildMemberAdd', function (member) {
const guild = member.guild;
if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
newUsers[guild.id].set(member.id,member.user);

if (newUsers[guild.id].size > 10) {
	const userlist = newUsers[guild.id].map(u => u.toString()).join(' ');
	guild.channels.find('name', 'general').send('Hello! Welcome to server \n' + userlist);
	newUsers[guild.id].clear();
}
});

ajudan.on('guildMemberRemove', function (member) {
	const guild = member.guild;
	if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
});
