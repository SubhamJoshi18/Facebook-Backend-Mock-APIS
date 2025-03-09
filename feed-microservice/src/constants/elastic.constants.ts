import { getEnvValue } from "../libs/env.libs";


const ELASTIC_URL = getEnvValue('ELASTIC_URL')
const ELASTIC_FEED_INDEX = getEnvValue('ELASTIC_FEED_INDEX')
const ELASTIC_FEED_PHOTO_INDEX = getEnvValue('ELASTIC_FEED_PHOTO_INDEX')

export {
    ELASTIC_URL,
    ELASTIC_FEED_INDEX,
    ELASTIC_FEED_PHOTO_INDEX
}