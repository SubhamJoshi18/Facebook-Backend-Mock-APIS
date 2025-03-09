import jwt from 'jsonwebtoken'
import { IJWTPayload } from '../interfaces/auth.interface'
import { getEnvValue } from '../libs/env.libs'


class JsonWebTokenHelper {



    public async createAccessToken(payload : IJWTPayload ){
        const options  : jwt.SignOptions = {
            issuer : 'Shubham Joshi',
            expiresIn : '1h'
        }

        const secretKey  = getEnvValue('SECRET_ACCESS_TOKEN') as string

        return new Promise((resolve,reject) => {
                jwt.sign(payload,secretKey,options,(err,token) => {
                    if(err) reject(err);
                    resolve(token)
                })

        })
    }

}


export default JsonWebTokenHelper