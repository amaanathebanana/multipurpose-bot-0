const { welcomeChannel } = require("../../../config.json")

module.exports = {
    id: "guildMemberAdd",
    async execute(member, client) {
        const channel = member.guild.channels.cache.get(welcomeChannel)
        if (!channel) return;
        try {
            channel.send(`Heya, ${member} welcome to the server `)
        } catch (error) {
         return console.log('Error sending welcome message.\n' + error )   
        }
    }
}