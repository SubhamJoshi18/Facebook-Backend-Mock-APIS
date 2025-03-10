import { getEnvValue } from "../libs/env.libs";
import { lmsLogger } from "../libs/logger.libs"
import amqp from 'amqplib'
import { MergeAllConsumer } from "./initQueueConsumer";
    
class MainQueueConnection {

        public async createConnection() {
            let retryCount = 4;
            while(retryCount > 0) {
                try{    
                    const rabbitMqUrl = getEnvValue('AMQP_URL') as string;
                    const connection  : amqp.ChannelModel = await amqp.connect(rabbitMqUrl);
                    return connection
                }catch(err){
                    console.log(err)
                    const isMaximumExceeded = retryCount.toString().startsWith('0')
                    if(isMaximumExceeded) throw new Error(`Maximum Retry is Exceeded`);
                    lmsLogger.error(`Error connecting to the Rabbitmq,`);
                    retryCount = retryCount > 0 ? retryCount - 1 : 0;
                    continue;
                }
            }
        }


        public async getChannel() : Promise<amqp.Channel>{
            const connection = await this.createConnection();
            const channel = connection?.createChannel();
            return channel as any
        }




}




export default MainQueueConnection