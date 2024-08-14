require('dotenv').config(); // Load environment variables from .env file

const { REST, Routes } = require('discord.js'); // Ensure correct import
const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
      name: 'carry',
      description: 'Create something!',
    },
    {
        name:"spongebob",
        description: "Squarepants",
    },
    {
      name: 'meme',
      description: 'Generates a Random Meme!',
    }
  ];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN); // Correctly set token

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');


    await rest.put(Routes.applicationCommands(process.env.CLIENTID), { // Register global commands
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
console.log('Commands:', commands);
