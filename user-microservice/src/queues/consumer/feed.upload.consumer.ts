import amqp from "amqplib";
import { lmsLogger } from "../../libs/logger.libs";
import { createExchange,createQueueIfNotExists,bindQueue } from "../../utils/channel.utils";
import { feedUploadQueueConfig } from "../../config/queue.config";
import { handleMessage } from "../handlers/feed.upload.handler";

async function feedUploadConsumer(channel: amqp.Channel) {
  try { 
    const { queueName , queueExchange, queueRoutingKey } = feedUploadQueueConfig

    const proccessQueueArr = await Promise.allSettled(
        [
            createExchange(channel,queueExchange),
            createQueueIfNotExists(channel,queueName),
            bindQueue(channel,queueName,queueExchange,queueRoutingKey)
        ]
    )

    const filteredRejected = proccessQueueArr.filter((data) => data.status !== 'fulfilled');

    if(Array.isArray(filteredRejected)) {
        for (const item of filteredRejected) {
            throw new Error(`Error while processing the Feed upload Consumer Queue Process , Reason : ${item.reason}`);
        }
    }

    await channel.prefetch(1)

    await channel.consume(queueName,async (msg : amqp.ConsumeMessage | null) => {
        await handleMessage(channel,msg) 
    },{noAck : true})

  } catch (err) {
    lmsLogger.error(`Error Consuming the message for the feedUploadConsumer`);
    throw err
  }
}

export { feedUploadConsumer };
