import {z} from "zod";

export const productSchema = z.object({
    name:z.string().min(2),
    brandId:z.number().min(1,"Brnad is required"),
    categoryId:z.number().min(1,"Category is required"),
    price:z.coerce.number().min(1),
    stock:z.coerce.number().min(1)
});

export type productForm = z.infer<typeof productSchema>;