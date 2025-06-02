import { db } from "@/db/db"
import { brands,products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextRequest,NextResponse } from "next/server"
export const PUT = async(req:NextRequest,{params}:{params:{id:string}})=>{
    try{
        const id = parseInt(params.id);
    const {name}= await req.json();

    if(!name){
        return NextResponse.json({error:"brandName is required"},{
            status:400
        })
    }

    const updated = await db.update(brands).set({brandName:name}).where(eq(brands.id,id)).returning();

    return NextResponse.json(updated[0],{
        status:200
    })
 }
 catch(e){
    return NextResponse.json("failed to put",{
        status:200
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
      .delete(brands)
      .where(eq(brands.id, id))
      .returning();

    if (deletedBrand.length === 0) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(deletedBrand[0], { status: 200 });
  } catch (err) {
    console.log('delete',err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
};
