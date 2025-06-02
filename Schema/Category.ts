import { z } from "zod"

export const categorySchema = z.object({
    name:z.string().min(2,"Minimum 2 Character is reqired"),
})

export type formData = z.infer<typeof categorySchema>