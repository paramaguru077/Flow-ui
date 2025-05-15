import { varchar } from "drizzle-orm/pg-core";
import { pgTable,serial } from "drizzle-orm/pg-core";

export const datas = pgTable("datas",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:255}).notNull(),
    email:varchar("email",{length:255}).notNull(),
    country:varchar("country",{length:100}).notNull()

    
})

