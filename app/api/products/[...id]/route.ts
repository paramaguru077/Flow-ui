import { db } from "@/db/db";
import { products } from "@/db/schema";

import { NextRequest,NextResponse } from "next/server";

import { eq } from "drizzle-orm";


export const PUT = async(req:NextRequest,{params}:{params:{id:string}})=>{
    try{
        const id = parseInt(params.id);
    const {name,brandId,categoryId,price,stock}= await req.json();
    if(!name|| !brandId||!categoryId||!price||!stock){
        return NextResponse.json({error:"All the field are required"},{
            status:400
        })
    }
    const updatedProduct = await db.update(products).set({name,brandId,categoryId,price,stock}).where(eq(products.id,id)).returning();

    return NextResponse.json(updatedProduct[0],{
        status:200
    })

    }
    catch(e){
       console.log("put error",e)
       return NextResponse.json({error:"failed to put"},{
            status:500
        })
    }

}

export const DELETE = async(req:NextRequest,{params}:{params:{id:string}})=>{
    try{
        const id = parseInt(params.id);
        const deleteProduct = await db.delete(products).where(eq(products.id,id)).returning();
        return NextResponse.json(deleteProduct[0],{
            status:200
        })
    }
    catch(e){
        console.log("delete error",e)
         return NextResponse.json("Failed to delete",{
            status:500
        })
    }
  
}