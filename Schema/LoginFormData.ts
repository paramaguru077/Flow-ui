import {z} from 'zod'


export const schema = z.object({
    name:z.string().min(2,"Enter valid character"),
    email:z.string().email("Invalid Email"),
    password:z.string().min(2,"Invalid Password")
})

export type formData = z.infer<typeof schema>