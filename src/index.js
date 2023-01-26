const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();


const { QuickDB}= require('quick.db');
const db = new QuickDB()

client.on(Events.GuildMemberAdd, async (member)=>{

    const channelID = await db.get(`welchannel_${member.guild.id}`)
    const channel = member.guild.channels.cache.get(channelID)
    const message = `**Welcome to the server, ${member}**`

    if(channelID == null) return;

    channel.send(message)
})



const levelSchema = require('./Schemas.js/level');
client.on(Events.MessageCreate, async (message) => {

    const {guild,author} = message;

    if(!guild || author.bot) return;

    levelSchema.findOne({Guild: guild.id, User: author.id}, async (err, data) =>{

        if(err) throw err;

        if(!data) {
            levelSchema.create({
                Guild: guild.id,
                User: author.id,
                XP: 0,
                Level: 0
            })
        } 
    })

    const channel = message.channel;

    const give = 1;

    const data = await levelSchema.findOne({Guild: guild.id, User: author.id});

    if(!data) return;

    const requiredXP = data.Level * data.Level * 20 + 20;

    if(data.XP + give >= requiredXP){
        data.XP += give;
        data.Level += 1;
        await data.save();

        if (!channel) return;

        const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`**Congratulation** ${author}, you have reached level ${data.Level}!`)

        channel.send({embeds: [embed]});
       
    }
    else {
        data.XP += give; 
        data.save()
    }


})


