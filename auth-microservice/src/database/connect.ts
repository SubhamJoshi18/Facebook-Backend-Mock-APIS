import mongoose from "mongoose"
import { getEnvValue } from "../libs/env.libs"


class SingletonDBConnection {
    public static async connectDB() : Promise<typeof mongoose> { 
        const databaseSource = await mongoose.connect(getEnvValue('MONGO_URL') as string)
        return databaseSource
    }
}

export default SingletonDBConnection