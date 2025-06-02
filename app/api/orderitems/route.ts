import { db } from "@/db/db";
import { order_items, orders} from "@/db/schema";
import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
const orderItem = z.object({
    orderId:z.number(),
    productId:z.number(),
    quantity:z.number().min(1),
    price:z.string()

})
export const POST =async(req:NextRequest)=>{
   try{
    const body = await req.json();
   const {orderId,productId,quantity,price}= orderItem.parse(body);

   const [newOrder] = await db.insert(order_items).values({orderId,productId,quantity,price}).returning();

   const totalCal = await db.select({
    quantity:order_items.quantity,
    price:order_items.price
   }).from(order_items).where(eq(order_items.orderId,orderId));

   const total = totalCal.reduce((sum,cal)=>{
    return sum + Number(cal.price)*Number(cal.quantity)
   },0)
  

     await db
      .update(orders)
      .set({ total: total.toFixed(2) }) 
      .where(eq(orders.id, orderId))
   return NextResponse.json({success:true,item:newOrder,total},{
    status:201
   })
   }
   catch(e:any){
    return NextResponse.json({
        error:e.message
    },{
        status:500
    })
   }

}