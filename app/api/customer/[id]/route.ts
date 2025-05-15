import { NextRequest,NextResponse } from "next/server";
import { db } from "@/db/db";
import { datas } from "@/db/schema";
import { eq } from "drizzle-orm";

//export const Get = async()

 export const PUT = async ( req:NextRequest,{params}:{params:{id:string}})=>{
    try{
        const{name,email,country}= await req.json();
    if(!name || !email || !country){
        return NextResponse.json({message:"All field are required"},{
            status:500
        })
    }
    const id= parseInt(params.id);
    if(isNaN(id)){
             return NextResponse.json("invalide id ",{
            status:500
        })
    }
   const res = await db.update(datas).set({name,email,country}).where(eq(datas.id,id)).returning();
    if(res.length==0){
        return NextResponse.json({message:"user not found"},{
            status:404
        })
    }
    return NextResponse.json({message:"successfully"},{
        status:200
    })
    

    }
    catch(e){

         return NextResponse.json("Failed to delete",{
            status:500
        })

    }


 }


export const DELETE = async(req:NextRequest,{params}:{params:{id:string}})=>{
    const id = parseInt(params.id);
     if(isNaN(id)){
        return NextResponse.json("invalide id ",{
            status:500
        })
     }
     try{
     
        const result= await db.delete(datas).where(eq(datas.id,id)).returning();
        if( result.length==0){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({message:"success Deleted"},{
            status:200
        })


     }
     catch(e){
        return NextResponse.json("Failed to delete",{
            status:500
        })

     }
}