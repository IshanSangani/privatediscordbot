const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv').config();
const rmeme = require('rmeme');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
  'chutiya','mkc', 'gandu', 'harami', 'saala', 'kutta', 'suar', 
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
  else if(message.content.toLowerCase().startsWith("hi kop ka bot")||message.content.toLowerCase().startsWith("hello kop ka bot")){
    let username = message.author.globalName;
    message.reply({
      content: "Hello, "+username+" 👋"
    })
  }

  // Add a new command handler for "hey" followed by a prompt
  if (message.content.toLowerCase().startsWith("hey ")) {
    const prompt = message.content.substring(4).trim(); // Extract the prompt part
    
    if (prompt) {
      try {
        // Show typing indicator while processing
        await message.channel.sendTyping();
        
        // Call AI API to get a response
        const response = await getAIResponse(prompt);
        
        // Reply with the AI response
        await message.reply({
          content: response
        });
      } catch (error) {
        console.error('Error getting AI response:', error);
        await message.reply({
          content: "Sorry, I couldn't process your request at the moment."
        });
      }
    } else {
      await message.reply({
        content: "Please provide a question or prompt after 'hey'."
      });
    }
  }
});

// Function to get AI response using Gemini API
async function getAIResponse(prompt) {
  try {
    // Modify the prompt here
    
    const modifiedPrompt = `Respond to the following prompt as if you were a helpful Discord bot named Kop Ka Bot also maybe use Hinglish sometimes and dont be cringe: ${prompt}`;

    const result = await model.generateContent(modifiedPrompt);
    const response = result.response;
    console.log(response.candidates[0].content.parts[0].text);
    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
}

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
  
  if (commandName === 'meme') {
    try {
      const memeURL = rmeme.generate();
      await interaction.reply({ content: 'Here is a random meme', files: [memeURL] });
  } catch (error) {
      console.log(error);
  }
}

  if (commandName === 'hey') {
    // Get the prompt from the options
    const prompt = interaction.options.getString('prompt');
    
    if (prompt) {
      await interaction.deferReply(); // Show "thinking" state
      
      try {
        const response = await getAIResponse(prompt);
        await interaction.editReply(response);
      } catch (error) {
        console.error('Error getting AI response:', error);
        await interaction.editReply("Sorry, I couldn't process your request at the moment.");
      }
    } else {
      await interaction.reply({
        content: "Please provide a question or prompt.",
        ephemeral: true
      });
    }
  }
});

client.login(process.env.TOKEN).catch(console.error);
console.log('Bot is online');
