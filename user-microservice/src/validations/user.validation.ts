import {z} from 'zod'


const changePasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export {
    changePasswordSchema
}