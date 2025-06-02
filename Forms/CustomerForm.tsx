"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, formData } from "@/Schema/FormData";
import { useEffect } from "react";
import axios from "axios";

type Props = {
  selectedUser: any;
  onCreate: () => void;
  onClearEdit: () => void;
  setOpenDialog: (value: boolean) => void;
};

export default function CustomerForm({
  selectedUser,
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
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setValue("name", selectedUser.name);
      setValue("email", selectedUser.email);
      setValue("country", selectedUser.country); 
    } else {
      reset();
    }
  }, [selectedUser, reset, setValue]);

  const onSubmit = async (data: formData) => {
    try {
      if (selectedUser) {
        await axios.put(`/api/customer/${selectedUser.id}`, data);
      } else {
        await axios.post("/api/customer", data);
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
 
      <input {...register("email")} placeholder="Email"  className="ring ring-fuchsia-600 px-7 py-3  rounded w-full outline-none"  />
      <p className="text-red-500 text-sm">{errors.email?.message}</p>
 
      <select {...register("country")}   className="ring ring-fuchsia-600 px-7 py-3  rounded w-full outline-none ">
        <option value="">--</option>
        <option value="india">India</option>
        <option value="usa">Usa</option>
        <option value="brazil">Brazil</option>
      </select>
      
      <p className="text-red-500 text-sm">{errors.country?.message}</p>

      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">
        {selectedUser ? "Update" : "Create"}
      </button>
    </form>
  );
}
