import {DataSource,DataSourceOptions} from 'typeorm'    
import { getDatabaseConfig } from '../config/database.config'



class SingletonDBConnection {
    public static async connectDB() : Promise<DataSource> { 
        const databaseSource = new DataSource(getDatabaseConfig())
        return databaseSource
    }
}

export default SingletonDBConnection