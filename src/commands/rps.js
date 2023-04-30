const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Play rock paper scissors with the bot")
        .addStringOption(option => option.setName('option').setDescription("Rock, Paper or Scissors?").setRequired(true)
            .addChoices(
                { name: 'Rock', value: 'Rock' },
                { name: 'Paper', value: 'Paper' },
                { name: 'Scissors', value: 'Scissors' },
            )),

    async execute(interaction, client) {
        const option = interaction.options.getString('option');
        const choices = ['Rock', 'Paper', 'Scissors'];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        if (option == choice) {
            await interaction.reply(`Your Choice: \`${option}\`\nMy Choice: \`${choice}\`\nWe both picked the same option so we tied!`)
        } else if (option == 'Rock' && choice == 'Paper' || option == 'Paper' && choice == 'Scissors' || option == 'Scissors' && choice == 'Rock') {
            await interaction.reply(`Your Choice: \`${option}\`\nMy Choice: \`${choice}\`\nI win!`)
        } else {
            await interaction.reply(`Your Choice: \`${option}\`\nMy Choice: \`${choice}\`\nYou win!`)
        }
            
    }
}


