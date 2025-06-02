import { NextRequest,NextResponse } from "next/server";
import { orders,datas } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const orderSchema = z.object({
  customerId: z.number(),
  status: z.string().min(1),
});
export const GET = async (req: NextRequest) => {
  try {
    const res = await db.select({
      orderId: orders.id,
      customerName: datas.name,
      country: datas.country,
      total: orders.total,
      status: orders.status,
      date: orders.date,
    })
    .from(orders)
    .innerJoin(datas, eq(orders.customerId, datas.id))
    .orderBy(orders.date);  

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    console.error("orders", err);
    return NextResponse.json({ error: "failed to get" }, { status: 500 });
  } 
};


export const POST = async (req:NextRequest) =>{
  try{
    const body = await req.json();
    const {customerId,status}= orderSchema.parse(body);
    const[newOrder]= await db.insert(orders).values({customerId,status,total:"0"}).returning();

    return NextResponse.json({success:true,order:newOrder},{status:201})
  
  }
  catch(e:any){
      return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}



