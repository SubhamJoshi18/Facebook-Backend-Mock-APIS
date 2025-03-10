import { feedUploadConsumer } from "./consumer/feed.upload.consumer";
import amqp from 'amqplib'


async function MergeAllConsumer(channel : amqp.Channel){
    await feedUploadConsumer(channel)
}

export {
    MergeAllConsumer
}