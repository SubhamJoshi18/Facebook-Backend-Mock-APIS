import dotenv from 'dotenv'
dotenv.config()



const checkKeyExists = (key : string) : boolean => {
    return process.env[key] ? true : false
}


const getEnvValue = (key : string) => {
    return checkKeyExists(key) ? process.env[key] : null
}


export {
    getEnvValue
}