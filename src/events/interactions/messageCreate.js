const userSchema = require('../../schemas/user.js');

module.exports = {
    id: "messageCreate",
    async execute(interaction, client) {
        if (interaction.author.bot) return;
        const userDB = await userSchema.findOne({ userID: interaction.author.id })
        if (!userDB) {
            await new userSchema({
                userID: interaction.author.id,
                messageCount: 1,
            }).save()
            return
        }
        await userSchema.findOneAndUpdate({ userID: interaction.author.id }, { $inc: { messageCount: 1 } })

    }
}


