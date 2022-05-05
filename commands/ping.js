module.exports.run = async(client, interaction) => {
    let ping = Math.round(client.shards.reduce((a, b) => a + b.latency, 0) / client.shards.size)

    if (ping == Infinity) {
        interaction.createMessage("Pong 🏓")
    } else {
        interaction.createMessage("Pong 🏓\n``" + Math.round(client.shards.reduce((a, b) => a + b.latency, 0) / client.shards.size) + "ms``")
    }

}

module.exports.options = {
    name: 'ping',
    description: 'Show the current ping'
}