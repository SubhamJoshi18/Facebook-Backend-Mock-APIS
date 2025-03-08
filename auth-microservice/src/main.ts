import express from 'express'
import { getEnvValue } from './libs/env.libs'
import { lmsLogger } from './libs/logger.libs'
import AuthServer from './server'


async function startAuthServer(){
        try{
            const app = express()
            const port = Number(getEnvValue('PORT'));
            const serverInstances = await AuthServer.getInstances(port);
            await serverInstances.startAuthServer(port,app)
        }catch(err){
            lmsLogger.error(`Error in the Auth Microservices`,err)
            process.exit(0)
        }
}

(async () => {
    await startAuthServer()
})()