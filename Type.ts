export type inputTypes = {
    id:string,
    name:string,
    email:string,
    country:string
}

export type customerTypes ={
    id:string,
    name:string,
    brand:string,
    category:string,
    price:number,
    stock:number
}

export type BrandTyes ={
    id:string,
    name:string,
    createdAt:Date,
    productCount:number
    
}
export type CategoryType = {
  id: string;           
  name: string;        
  createdAt: Date;
   productCount:number
};

export type productForm = {
  name: string;
  brandId: number;
  categoryId: number;
  price: number;
  stock: number;
};
