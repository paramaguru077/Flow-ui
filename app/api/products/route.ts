import { NextRequest,NextResponse } from "next/server"
import { db } from "@/db/db"
import { products,brands,categories } from "@/db/schema"

import { ilike, sql,and,eq } from "drizzle-orm";
export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || '1');
        const limit = parseInt(searchParams.get("limit") || '10');
        const name = searchParams.get("name") || "";
        const category = searchParams.get("category") || "";
        const offset = (page - 1) * limit;

        const conditions = [];
        if (name) {
            conditions.push(ilike(products.name, `%${name}%`));
        }
        if (category) {
            conditions.push(ilike(categories.name, `%${category}%`));
        }

        
        const dataQuery = db
            .select({
              id:products.id,
              name:products.name,
              price:products.price,
              stock:products.stock,
              brand:brands.brandName,
              category:categories.name
            })
            .from(products)
            .leftJoin(brands,eq(products.brandId,brands.id))
            .leftJoin(categories,eq(products.categoryId,categories.id))
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(sql`${products.id} DESC`)
            .limit(limit)
            .offset(offset);

        const getData = await dataQuery;

        // Total count also needs to apply the same filter for accurate pagination
        const totalQuery = db
            .select({ count: sql<number>`count(*) ` })
            .from(products)
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

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, price, stock, brandId, categoryId } = body;

    if (!name || !brandId || !categoryId || !price || !stock) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = await db.insert(products).values({
      name,
      price,
      stock,
      brandId,
      categoryId,
    }).returning();

    return NextResponse.json(newProduct[0], { status: 201 });

  } catch (e: any) {
    console.error("POST error:", e);
    return NextResponse.json(
      { message: e.message || "Post request failed" },
      { status: 400 }
    );
  }
};
