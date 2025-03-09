import { getEnvValue } from "../libs/env.libs";


const ELASTIC_URL = getEnvValue('ELASTIC_URL')
const ELASTIC_INDEX = getEnvValue('ELASTIC_INDEX')

export {
    ELASTIC_URL,
    ELASTIC_INDEX
}