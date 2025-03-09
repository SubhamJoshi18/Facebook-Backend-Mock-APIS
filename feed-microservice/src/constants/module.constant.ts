import { getEnvValue } from "../libs/env.libs";



const EXPRESS_APP_URL_FORGET_PASSWORD = `http://localhost:${getEnvValue('PORT')}/api/auth/forget-password`

export {
    EXPRESS_APP_URL_FORGET_PASSWORD
}