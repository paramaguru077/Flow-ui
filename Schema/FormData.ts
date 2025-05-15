import { z } from "zod"

export const schema = z.object({
    name:z.string().min(2,"Minimum 2 Character is reqired"),
    email:z.string().email("invalid email"),
    country:z.string().min(1,"country is required")

})

export type formData = z.infer<typeof schema>