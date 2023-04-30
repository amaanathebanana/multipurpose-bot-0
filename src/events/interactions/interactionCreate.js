const { PermissionsBitField, EmbedBuilder } = require("discord.js");
module.exports = {
    id: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.guild) return interaction.reply({ embeds: [new EmbedBuilder().setTitle('Error!').setDescription('We do not currently support commands in direct messages.').setColor('Red').setTimestamp()], ephemeral: true });
        let developer = false
        if (interaction.user.id == '763277789125804073') developer = true
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) staff = true
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                if (command.developer && !developer) return interaction.reply({ embeds: [new EmbedBuilder().setTitle('Error!').setDescription('You do not have permission to use this command').setColor('Red').setTimestamp()], ephemeral: true })
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error)
                if (interaction.replied) {
                    await interaction.editReply({
                        content: "There was an error while executing this command!",
                        embeds: []
                    }).catch(() => { })
                } else {
                    await interaction.reply({
                        content: "There was an error while executing this command!",
                        ephemeral: true
                    }).catch(() => { })
                }
            }
        }
        else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button || button == undefined) return;
            try {
                if (button.developer && !developer) return interaction.reply({ embeds: [new EmbedBuilder().setTitle('Error!').setDescription('You do not have permission to use this button.').setColor('Red').setTimestamp()], ephemeral: true })
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error)
                if (interaction.replied) {
                    await interaction.editReply({
                        content: "There was an error while executing this button!",
                        embeds: []
                    }).catch(() => { });
                } else {
                    await interaction.reply({
                        content: "There was an error while executing this button!",
                        ephemeral: true
                    }).catch(() => { })
                }
            }
        }
        else if (interaction.isSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.customId);
            if (!selectMenu || selectMenu == undefined) return;
            try {
                if (selectMenu.developer && !developer) return interaction.reply({ embeds: [new EmbedBuilder().setTitle('Error!').setDescription('You do not have permission to use this select menu.').setColor('Red').setTimestamp()], ephemeral: true })
                await selectMenu.execute(interaction, client);
            } catch (error) {
                console.error(error);
                if (interaction.replied) {
                    await interaction.editReply({
                        content: "There was an error while executing this select menu!",
                        embeds: []
                    }).catch(() => { });
                } else {
                    await interaction.reply({
                        content: "There was an error while executing this select menu!",
                        ephemeral: true
                    }).catch(() => { })
                }
            }
        }
        else if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);
            if (!modal || modal == undefined) return;
            try {
                if (modal.developer && !developer) return interaction.reply({ embeds: [new EmbedBuilder().setTitle('Error!').setDescription('You do not have permission to use this modal.').setColor('Red').setTimestamp()], ephemeral: true })
                modal.execute(interaction, client);
            } catch (error) {
                console.error(error)
                if (interaction.replied) {
                    await interaction.editReply({
                        content: "There was an error while executing this modal!",
                        embeds: []
                    }).catch(() => { });
                } else {
                    await interaction.reply({
                        content: "There was an error while executing this modal!",
                        ephemeral: true
                    }).catch(() => { })
                }
            }
        }
        else return;
    }
}

