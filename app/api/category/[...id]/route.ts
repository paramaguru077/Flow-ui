import { db } from "@/db/db"
import { categories,products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
export const PUT = async(req:NextRequest,{params}:{params:{id:string}})=>{
    try{
    const id = parseInt(params.id);
    const {name}= await req.json();
    console.log(name);

    if(!name){
        return NextResponse.json({error:"category name is required"},{
            status:400
        })
    }

    const updated = await db.update(categories).set({name}).where(eq(categories.id,id)).returning();

    return NextResponse.json(updated[0],{
        status:200
    })
 }
 catch(e){
  console.log("category", e)
    return NextResponse.json("failed to put",{
        status:500
    })

 }


}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const id = parseInt(params.id);

    const deletedBrand = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    if (deletedBrand.length === 0) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(deletedBrand[0], { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
};
