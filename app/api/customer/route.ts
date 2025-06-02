import { db } from "@/db/db";
import { datas } from "@/db/schema";
import { and, ilike, sql, count as sqlCount } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || '1');
        const limit = parseInt(searchParams.get("limit") || '10');
        const name = searchParams.get("name") || "";
        const country = searchParams.get("country") || "";
        const offset = (page - 1) * limit;

        const conditions = [];
        if (name) {
            conditions.push(ilike(datas.name, `%${name}%`));
        }
        if (country) {
            conditions.push(ilike(datas.country, `%${country}%`));
        }

        
        const dataQuery = db
            .select()
            .from(datas)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(sql`${datas.id} DESC`)
            .limit(limit)
            .offset(offset);

        const getData = await dataQuery;

        // Total count also needs to apply the same filter for accurate pagination
        const totalQuery = db
            .select({ count: sql<number>`count(*) ` })
            .from(datas)
            .where(conditions.length > 0 ? and(...conditions) : undefined);

        const totalData = await totalQuery;

        return NextResponse.json({
            data: getData,
            meta: {
                total: totalData[0].count,
                page,
                limit,
                totalPages: Math.ceil(totalData[0].count / limit)
            }
        }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json("Failed to get", { status: 500 });
    }
};

export const POST = async(req: NextRequest) => {
   try {
     const body = await req.json();
     if (Array.isArray(body)) {
        for (const item of body) {
             if (!item.name || !item.email || !item.country) {
                    return NextResponse.json("All data is required in every item", { status: 400 });
                }
        }
        
        const newDatas = await db.insert(datas).values(body).returning();
        return NextResponse.json(newDatas, { status: 201 });
            
     } else {
        const { name, email, country } = body;
        if (!name || !email || !country) {
            return NextResponse.json("All data is required", {
                status: 400
            });
        }
        const newData = await db.insert(datas).values({ name, email, country }).returning();
        return NextResponse.json(newData[0], {
            status: 201
        });
     }
   } catch (e) {
     console.error(e);
     return NextResponse.json("failed to post", {
            status: 500
     });
   }
}