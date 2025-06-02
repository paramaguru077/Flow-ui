import { db } from "@/db/db"
import { products,brands } from "@/db/schema"
import { eq,ilike,sql } from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
export const GET = async (req:NextRequest) => {

  try {
    const {searchParams} = new URL(req.url);
    const name = searchParams.get("name");
    const result = await db
      .select({
        id: brands.id,
        name: brands.brandName,
        createdAt: brands.createAt,
        productCount: sql<number>`COUNT(${products.id})::int`.as("productCount")
      })
      .from(brands)
      .leftJoin(products, eq(products.brandId, brands.id))
      .where(
        name ? ilike(brands.brandName,`%${name}%`):undefined)
      
      .groupBy(brands.id)
      .orderBy(brands.id);

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    console.error("Error", e);
    return NextResponse.json({ message: "failed to get" }, { status: 500 });
  }
};

export const POST =async(req:NextRequest)=>{
     try{
        const {name}=await req.json();
        if(!name){
            return NextResponse.json({message:"Brandname is required"},{
                status:400
            })
        }
        const insertData = await db.insert(brands).values({brandName:name}).returning();
        return NextResponse.json(insertData[0],{
            status:201
        })

     }
     catch(e){
        console.log("Error",e)
        return NextResponse.json({message:"failed to post"},{
            status:500
        })
     }

}