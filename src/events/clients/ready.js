const { loadCommands } = require("../../handlers/commandHandler");
const config = require("../../../config.json");
const mongoose = require("mongoose");
const cron = require("cron");
module.exports = {
    id: "ready",
    once: true,
    async execute(client) {
        await loadCommands(client)
        await mongoose.connect(config.databaseURL).then(() => console.log("Connected to database"));
        console.log(`Logged into ${client.user.username}#${client.user.discriminator} | ${client.user.id}`)
        if (config.scheduledMessageHour > 24 || config.scheduledMessageHour < 0) return console.log("Invalid hour in config.json")
        if (config.scheduledMessageMinute > 59 || config.scheduledMessageMinute < 0) return console.log("Invalid minute in config.json")
        let scheduledMessage = new cron.CronJob(`0 ${config.scheduledMessageMinute} ${config.scheduledMessageHour} * * *`, () => { 
            const channel = client.channels.cache.get(config.scheduledMessageChannel)
            if (!channel) return;
            try {
                channel.send(`Heya! This is a scheduled message, and the time is ${config.scheduledMessageHour}:${config.scheduledMessageMinute}`)
            } catch (error) {
             return console.log('Error sending scheduled message.\n' + error )   
            }
        })
        scheduledMessage.start()
    }
}