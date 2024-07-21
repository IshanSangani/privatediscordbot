const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

// Define the words to look for
const triggerWords = [
  'madarchod','bhadwa','bhadwe', 'bhenchod', 'mc', 'bc', 'teri maa ki', 'maa',
  'chutiya', 'gandu', 'harami', 'saala', 'kutta', 'suar', 
  'kaminey', 'ullu', 'ullu ka pattha', 'loda', 'lodu', 'chod',
  'randi', 'raand', 'chinal', 'kutti', 'chodu', 'bhosdike', 
  'bhosdika', 'lavde', 'lavda', 'gaand', 'chut', 'chut ki', 
  'maderchod', 'suar ki aulad', 'teri maa', 'behen', 'behen ki', 
  'lode', 'bitch', 'fuck', 'motherfucker', 'asshole', 'bastard', 
  'cunt', 'dickhead', 'dick', 'pussy', 'slut', 'whore', 'faggot',
  'nigger', 'spic', 'chink', 'wop', 'kike', 'cracker', 'tranny',
  'homo', 'retard', 'idiot', 'stupid', 'dumb', 'moron', 'imbecile'
]; // Replace with your desired words or phrases

// Create a regular expression pattern for the trigger words
const triggerWordsPattern = new RegExp(triggerWords.join('|'), 'i');

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  // Check if the message contains any of the trigger words using regular expressions
  const containsTriggerWord = triggerWordsPattern.test(message.content);

  if (containsTriggerWord && message.author.globalName !== "Kopro") {
    try {
      // Reply to the message
      await message.reply(`${message.author.globalName},\nYour message: "${message.content}"\nGaali mt de Gandu 😡👿.`);

      // Delete the original message
      await message.delete();
    } catch (error) {
      console.error('Error handling the message:', error);
    }
  }


  if (message.content.toLowerCase().startsWith("hi kop ka bot")&& message.author.globalName === "Kopro") {
    message.reply({
      
      content: "Hello KING Kop"
    });
  }
  if (message.author.username === "Ishan") { // Changed `globalName` to `username`
    message.reply({
      content: "Kya bolti Public"
    }).catch(console.error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // Handle different command names
  if (commandName === 'ping') {
    await interaction.reply('https://tenor.com/view/dankjerry-tom-and-jerry-jerry-dank-gif-18715520');
  }

  if (commandName === 'carry') {
    const members = await interaction.guild.members.fetch();
    const targetUser = members.get('391383359106056197'); // Replace with the user ID you want to mention
    if (targetUser) {
      await interaction.reply(`Hey <@${targetUser.id}>, NHK?`);
    }
  }

  if (commandName === 'spongebob') {
    await interaction.reply('https://tenor.com/view/spongebob-backshots-gif-1172518849162068669');
  }
});

client.login(process.env.TOKEN).catch(console.error);
console.log('Bot is online');
