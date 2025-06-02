import { db } from "@/db/db";
import { products,categories } from "@/db/schema";
import { sql,eq,ilike} from "drizzle-orm";
import { NextRequest,NextResponse } from "next/server";

export const GET =async(req:NextRequest)=>{
   const {searchParams} = new URL(req.url);
   const name = searchParams.get("name");
    try{
      const result = await db
            .select({
              id: categories.id,
              name: categories.name,
              createdAt: categories.createdAt,
              productCount: sql<number>`COUNT(${products.id})::int`.as("productCount")
            })
            .from(categories)
            .leftJoin(products, eq(products.categoryId, categories.id))
            .where(
                    name ? ilike(categories.name,`%${name}%`):undefined)
                  
            .groupBy(categories.id)
            .orderBy(categories.id);

       return NextResponse.json(result,{
            status:200
        })
    }
    catch(err){
           console.log("Error",err)
        return NextResponse.json({message:"failed to get"},{
            status:500
        })

    }
}



export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }
    const insertData = await db
      .insert(categories)
      .values({ name })
      .returning();
    return NextResponse.json(insertData[0], { status: 201 });
  } catch (e) {
    console.error("Error while inserting category:", e);
    return NextResponse.json(
      { message: "Failed to post" },
      { status: 500 }
    );
  }
};