import {
    betterAuth
} from 'better-auth';
import { db } from '@/db/db';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from '../db/schema'
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        },
        linkedin: {
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!
        }
    },

     database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema:schema,
    })

});