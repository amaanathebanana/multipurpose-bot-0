const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder, CommandInteractionOptionResolver, IntegrationApplication } = require("discord.js");
const { api_key } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lookup")
        .setDescription("Lookup the price of a stock")
        .addStringOption(option => option.setName('symbol').setDescription("The symbol of the stock you want to lookup").setRequired(true)),
    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        await interaction.deferReply();
        const symbol = interaction.options.getString('symbol');
        const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${api_key}`;
        const response = await fetch(url)
        if (response.status != 200) {
            return await interaction.editReply("Invalid Stock");
        }
        const data = await response.json();

        const companyName = data.companyName;
        const price = data.latestPrice
        const stocks = data.symbol;

        const embed = new EmbedBuilder()
            .setTitle(`${companyName}`)
            .setColor('#C69B6D')
            .setDescription(`${stocks}`)
            .addFields(
                {
                    name: `Price`,
                    value: "`" + `$${price}` + "`",
                    inline: true,
                },
                {
                    name: `\u200b`,
                    value: `\u200b`,
                    inline: true,
                }
            )
        await interaction.editReply({
            embeds: [embed]
        })
    }
}


