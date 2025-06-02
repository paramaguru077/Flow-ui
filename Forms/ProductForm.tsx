"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productForm,productSchema } from "@/Schema/ProductData";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrandTyes, CategoryType } from "@/Type";


type Props = {
  selectedUser: any;
  onCreate: () => void;
  onClearEdit: () => void;
  setOpenDialog: (value: boolean) => void;
};


export default function ProductForm({selectedUser,onCreate,onClearEdit,setOpenDialog}:Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm<productForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      
      
    },
  });
  const[brand,setBrand] = useState<BrandTyes[]>([]);
  const[category,setCategory]= useState<CategoryType[]>([]);

  useEffect(()=>{
    const fetchApi = async()=>{
       try{
        const[brandsRes,categoryRes] = await Promise.all([
          axios.get("/api/brands"),
          axios.get("/api/category")
        ])
        setBrand(brandsRes.data);
        setCategory(categoryRes.data)
       }
       catch(err){
        console.log("Failed to fetchBrands and categories")
       }
    }
    fetchApi();

  },[])

    useEffect(() => {
      if (selectedUser) {
        setValue("name", selectedUser.name),
        setValue("brandId", selectedUser.brandId),
        setValue("categoryId", selectedUser.categoryId),
        setValue("price", selectedUser.price),
        setValue("stock", selectedUser.stock);
      }
       else {
        reset();
      }
    }, [selectedUser, reset, setValue]);

  const onSubmit = async (data: productForm) => {
    try {
      if (selectedUser) {
        await axios.put(`/api/products/${selectedUser.id}`, data);
      } else {
        await axios.post("/api/products", data);
      }
      onCreate();
      onClearEdit();
      setOpenDialog(false);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex justify-center flex-col items-center mb-4 ">
      <input placeholder="Name" {...register("name")}  className="ring ring-fuchsia-600 px-7 py-3  rounded w-full mt-5 outline-none"/>
      {errors.name && <p className="text-red-500 text-[14px]">{errors.name.message}</p>}

      <select {...register("brandId",{valueAsNumber:true})} className="ring ring-fuchsia-600 px-7 py-3  rounded w-full mt-5 outline-none">
        <option value="">Select Brands</option>
        {
          brand.map((b)=>(
            <option key={b.id} value={b.id}>{b.name}</option>
          ))
        }
      </select>
      {errors.brandId && <p className="text-red-500 text-[14px]"> {errors.brandId.message}</p>}

      <select {...register("categoryId",{valueAsNumber:true})} className="ring ring-fuchsia-600 px-7 py-3  rounded w-full mt-5 outline-none" >
        <option value=""> Select the Category</option>
        {
          category.map((cat)=>(
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))
}
      </select>
       {errors.categoryId && <p className="text-red-500 text-[14px]"> {errors.categoryId.message}</p>}
      

      

      <input type="number" placeholder="Price" {...register("price", { valueAsNumber: true })} className="ring ring-fuchsia-600 px-7 py-3  rounded w-full  outline-none" />
      {errors.price && <p className="text-red-500 text-[14px]">{errors.price.message}</p>}

      <input type="number" placeholder="Stock" {...register("stock", { valueAsNumber: true })} className="ring ring-fuchsia-600 px-7 py-3  rounded w-full  outline-none" />

      {errors.stock && <p className="text-red-500 text-[14px]">{errors.stock.message}</p>}

      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">
        { selectedUser?"Update": "create"}
      </button>
    </form>
  );
}
