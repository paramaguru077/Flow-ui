"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import axios from "axios";
import { categorySchema,formData } from "@/Schema/Category";

type Props = {
  selectedCategory: any;
  onCreate: () => void;
  onClearEdit: () => void;
  setOpenDialog: (value: boolean) => void;
};

export default function CategoryForm({
  selectedCategory,
  onCreate,
  onClearEdit,
  setOpenDialog,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<formData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      
    },
  });

  useEffect(() => {
    if (selectedCategory) {
      setValue("name", selectedCategory.name);
    } else {
      reset();
    }
  }, [selectedCategory, reset, setValue]);

  const onSubmit = async (data: formData) => {
    try {
      if (selectedCategory) {
        await axios.put(`/api/category/${selectedCategory.id}`, { name: data.name });
      } else {
        await axios.post("/api/category",{ name: data.name });
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
      <input {...register("name")} placeholder="Name"  className="ring ring-fuchsia-600 px-7 py-3  rounded w-full mt-5 outline-none" />
      <p className="text-red-500 text-sm">{errors.name?.message}</p>
 
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">
        {selectedCategory ? "Update" : "Create"}
      </button>
    </form>
  );
}
