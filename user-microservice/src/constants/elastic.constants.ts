import { getEnvValue } from "../libs/env.libs";


const ELASTIC_URL = getEnvValue('ELASTIC_URL')

export {
    ELASTIC_URL
}