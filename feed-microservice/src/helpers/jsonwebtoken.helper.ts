import jwt from 'jsonwebtoken'
import { getEnvValue } from '../libs/env.libs'


class JsonWebTokenHelper {



    public async verifyAccessToken(token:string) {
      
        
        const secretKey = getEnvValue('SECRET_ACCESS_TOKEN') as string
      
        return new Promise((resolve,reject) => {
             jwt.verify(token,secretKey,(err,decodedToken) => {
                if(err) reject(err);
                resolve(decodedToken)
             })
        })
    }

}


export default JsonWebTokenHelper