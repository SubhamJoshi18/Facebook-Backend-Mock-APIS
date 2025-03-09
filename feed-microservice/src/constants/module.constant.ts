import { getEnvValue } from "../libs/env.libs";



const EXPRESS_APP_URL_FORGET_PASSWORD = `http://localhost:${getEnvValue('PORT')}/api/auth/forget-password`

const FEED_TYPE = {
    Photo : true,
    Video : true,
    Text : true
}

export {
    EXPRESS_APP_URL_FORGET_PASSWORD,
    FEED_TYPE
}