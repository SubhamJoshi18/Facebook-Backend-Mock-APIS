import {DataSourceOptions} from 'typeorm'
import { getEnvValue } from '../libs/env.libs'


const getDatabaseConfig = ( )  : DataSourceOptions => {
    const dbConfig : DataSourceOptions = {
        type : 'mysql',
        host : getEnvValue('DB_HOST') as string,
        port : Number(getEnvValue('DB_PORT')),
        database : getEnvValue('DB_NAME') as string,  
        synchronize : true,
        logging : false
    }
    return dbConfig
}

export {
    getDatabaseConfig
}
