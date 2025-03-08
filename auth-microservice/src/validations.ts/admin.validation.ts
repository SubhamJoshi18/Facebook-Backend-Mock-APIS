import {z} from 'zod'


const createFacultySchema = z.object({


    facultyName : z.string().min(3),
    


})

export {
    createFacultySchema
}