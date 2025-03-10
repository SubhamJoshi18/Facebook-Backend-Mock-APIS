import amqp from 'amqplib'
import { lmsLogger } from '../../libs/logger.libs'
import { feedUploadQueueConfig } from '../../config/queue.config'


async function handleMessage (channel : amqp.Channel,msg : amqp.ConsumeMessage | null)  : Promise<void> {

    if(msg?.content) {
        try{    
            const parseContent = JSON.parse(msg.content.toString());
            console.log(parseContent)

        }catch(err){
            lmsLogger.error(`Error while handling the message for the Queue : ${feedUploadQueueConfig['queueName']}`)
        }finally {
            lmsLogger.info(`Acknowleding the Message : ${msg}`)
            await channel.ack(msg)
        }
    }
}   


export {
    handleMessage
}