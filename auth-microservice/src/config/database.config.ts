import {DataSourceOptions} from 'typeorm'
import { getEnvValue } from '../libs/env.libs'


const getDatabaseConfig = ( )  : DataSourceOptions => {
    const dbConfig : DataSourceOptions = {
        type : 'mysql',
        host : getEnvValue('DB_HOST') as string,
        port : Number(getEnvValue('DB_PORT')),
        database : getEnvValue('DB_NAME') as string,  
        username : getEnvValue('DB_USER') as string,
        password : getEnvValue("DB_PASSWORD") as string,
        synchronize : true,
        logging : false
    }
    console.log(dbConfig)
    return dbConfig
}

export {
    getDatabaseConfig
}
