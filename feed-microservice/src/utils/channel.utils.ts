import amqp from 'amqplib'


async function createExchange(channel : amqp.Channel, exchange : string,exchangeType='direct') {
        await channel.assertExchange(exchange,exchangeType,{durable : true});
        return 
}


async function createQueueIfNotExists(channel : amqp.Channel, queueName:string) {
    await channel.assertQueue(queueName,{durable:true})
    return 
}

async function bindQueue(channel : amqp.Channel,queueName:string,exchange:string,routingKey:string) {
    await channel.bindQueue(queueName,exchange,routingKey);
    return 
}

export {
    createExchange,
    createQueueIfNotExists,
    bindQueue
}