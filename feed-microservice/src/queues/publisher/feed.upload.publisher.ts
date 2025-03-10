import { feedUploadQueueConfig } from "../../config/queue.config";
import { lmsLogger } from "../../libs/logger.libs";
import { bindQueue, createExchange, createQueueIfNotExists } from "../../utils/channel.utils";
import MainQueueConnection from "../mainQueueConnection"


async function publishMessageToFeedUpload(message : any){


    const amqpInstances = new MainQueueConnection();
    const channel = await amqpInstances.getChannel();
    const { queueExchange, queueName , queueRoutingKey } = feedUploadQueueConfig


    try{

        const processQueueArr = await Promise.allSettled(
            [
                createExchange(channel,queueExchange),
                createQueueIfNotExists(channel,queueName),
                bindQueue(channel,queueName,queueExchange,queueRoutingKey)
            ]
        )
        
        const filteredRejcted = processQueueArr.filter((data) => data.status !== 'fulfilled')
        
        if(Array.isArray(filteredRejcted)) {
            for (const item of filteredRejcted) {
                throw new Error(`Error while Publishing the message to the ${feedUploadQueueConfig['queueName']}, Reason : ${item.reason}`);
            }
        }

        const bufferMessage =  Buffer.from(JSON.stringify(message))

        await channel.publish(queueExchange,queueRoutingKey,bufferMessage)

        lmsLogger.info(`Message ${JSON.stringify(message)} Published Successfully to Queue : ${feedUploadQueueConfig['queueName']}`)


    }catch(err){
        lmsLogger.error(`Error Publishing the Message to the ${feedUploadQueueConfig['queueName']}`)
    }finally{
        if(channel) {
            await channel.close();
        }
    }
}

export {
    publishMessageToFeedUpload
}