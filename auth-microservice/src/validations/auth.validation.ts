import { z } from 'zod';

const createAccountSchema  = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long").max(20, "Username cannot exceed 20 characters")
});


const loginAccountSchema  = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});



export { createAccountSchema ,loginAccountSchema };
