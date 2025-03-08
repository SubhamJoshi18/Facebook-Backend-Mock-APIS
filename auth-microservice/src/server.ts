import { Application } from "express"
import { lmsLogger } from "./libs/logger.libs"
import initalizeServerMiddleware from "./middlewares/server.middleware"
import initializeServerRoutes from "./routes/server.routes"
import SingletonDBConnection from "./database/connect"
import { DataSource } from "typeorm"
import { getEnvValue } from "./libs/env.libs"
import mongoose from "mongoose"


class AuthServer {

    public static serverInstances =  new Map()

    public static async getInstances(serverPort : number) : Promise<AuthServer | any>{
        if(!this.serverInstances.has(serverPort)){
            this.serverInstances.set(serverPort,new AuthServer())
        }
        return this.serverInstances.get(serverPort)
    } 


    public async startAuthServer(port:number, app : Application) : Promise<void> {
        try{  
            SingletonDBConnection.connectDB().then(async (connection : typeof mongoose) => {
                lmsLogger.info(`Database Connected Successfully, DB Name : ${connection.connection.name}`)
                await this.initalizeRouteAndMiddlewares(app as Application)
                app.listen(port,() => {
                    lmsLogger.info(`Backend Auth Microservice is running on ${port}`)
                })
            }).catch((err) => {
                console.log(err)
                lmsLogger.error(`Error Connecting to the Database`)
                throw err
            })
           
        }catch(err){
            lmsLogger.error(`Error Starting the Express Server`,err) 
            throw err
        }
    }


    public async initalizeRouteAndMiddlewares(app : Application) : Promise<void> {
        await Promise.all([initalizeServerMiddleware(app),initializeServerRoutes(app)])
    }
    
}


export default AuthServer