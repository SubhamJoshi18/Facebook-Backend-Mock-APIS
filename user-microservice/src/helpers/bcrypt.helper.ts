import { getEnvValue } from "../libs/env.libs"
import bcrypt from 'bcrypt'


class BcryptHelper {


    private async genSalt(){    
            const saltValue = Number(getEnvValue('SALT'))
            return bcrypt.genSalt(saltValue)
    }


    public async hashPassword(rawPassword : string){
        const generatedSalt = await this.genSalt()
        const hashPassword = await bcrypt.hash(rawPassword,generatedSalt)
        return hashPassword
    }


    public async comparePassword(newPassword : string, oldPassword : string) {
        const compareStatus = await bcrypt.compare(newPassword,oldPassword)
        return compareStatus
    }

}



export default BcryptHelper