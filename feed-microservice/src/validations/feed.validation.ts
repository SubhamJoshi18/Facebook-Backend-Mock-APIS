import {z} from 'zod'


const createPostSchema = z.object({


    caption : z.string(),
    title : z.string(),
    description : z.string(),
    type : z.enum(['Photo','Video','Text']),
    tags : z.array(z.string()),


    
})


export {
    createPostSchema
}