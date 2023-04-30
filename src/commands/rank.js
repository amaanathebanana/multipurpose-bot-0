const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const userSchema = require("../schemas/user.js")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("View the message count of yourself or another member")
        .addUserOption(option => option.setName("user").setDescription("The user to view the message count of ")),
    async execute(interaction, client) {
        await interaction.deferReply()
        const user = interaction.options.getUser("user") || interaction.user;
        const database = await userSchema.find({}).sort({ messageCount: -1 })
        const position = database.findIndex((dbUser) => dbUser.userID == user.id) + 1 || "N/A"
        let messageCount = 0
        if (position != "N/A") messageCount = database[position - 1].messageCount
        const embed = new EmbedBuilder()
            .setTitle(`${user.tag}'s Rank`)
            .setDescription(`**Rank:** ${position}\n**Message Count:** ${messageCount}`)
            .setColor("Blurple")
        await interaction.editReply({ embeds: [embed] })

        
    }
}

