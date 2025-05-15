"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Funnel } from 'lucide-react'
import { formData,schema } from '@/Schema/FormData'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import FilterData from './FilterData'
import { useSearchParams ,useRouter} from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
type HeaderPros = {
    onCreate:()=>void
    selectedUser: any;
   onClearEdit: ()=> void;
   openDialog: boolean;
   setOpenDialog:(value:boolean)=> void;
 //  handleFilterChanges: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Header = ({onCreate,selectedUser,onClearEdit,openDialog,setOpenDialog,}:HeaderPros) => {
        

  const searchParams = useSearchParams();
  const router = useRouter();
    const[openFilter,setOpenFilter] = useState(false);
    const[searchValue,setSearchValue]= useState(searchParams.get("name")?.trim()||"");
    const[searchCountry,setSearchCountry]= useState(searchParams.get("country")?.trim()||"");

    const filterApplied ={
        searchValue,
        searchCountry
    }
    let filterCount = Object.values(filterApplied).filter(value=>value.trim()!=="").length

     const {
        handleSubmit,reset,
        formState:{errors},
        setValue,
        register
    }= useForm<formData>({
        resolver:zodResolver(schema),defaultValues:{
            name:"",
            email:"",
            country:""
        }
    })
    useEffect(()=>{
        if(selectedUser){
            setValue("name",selectedUser.name),
            setValue("email",selectedUser.email),
            setValue("country",selectedUser.country)
            setOpenDialog(true);
        }
        else{
            reset();
        }

    },[selectedUser,openDialog,reset]);
    useEffect(()=>{
        const params = new URLSearchParams();
        if(searchValue){
            params.set("name",searchValue);

        }
        if(searchCountry){
            params.set("country",searchCountry)
        }
        router.push(`?${params.toString()}`);

    },[searchValue,searchCountry])
    

    const handleFilterChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> )=>{
        const{name,value} = e.target;
        if(name=="name"){
            setSearchValue(value);
        }
        else if(name=="country"){
            setSearchCountry(value)
        }

    }

     useEffect(() => {
    setSearchValue(searchParams.get("name") || "");
    setSearchCountry(searchParams.get("country") || "");
     filterCount = Object.values(filterApplied).filter(value=>value.trim()!=="").length


    

  }, [searchParams]);
  /*useEffect(()=>{
    onCreate();
  },[searchCountry,searchValue])*/

  
    const onSubmit = async(data:formData)=>{
        try{
            if(selectedUser){
                const res = await axios.put(`/api/customer/${selectedUser.id}`,data)
            }
            else{
                const res = await axios.post("/api/customer",data);
            }
          
          onCreate();
          reset();
          setOpenDialog(false);
          onClearEdit();


        }
        catch(e){
            console.log(e);

        }

    }
  return (
    <header className=' p-4 flex space-x-3 justify-between w-full'>
        <div>
            <h1 className='text-2xl tracking-wide font-bold '>Customers</h1>
        </div>
        <nav className='flex space-x-4'>
            <input type="text" name='name' className=' px-2 py-2 rounded border-0 ring-1 ring-neutral-500' value={searchValue}
            onChange={handleFilterChanges} placeholder='Name..'/>
             <div className='flex items-center gap-2.5'>
                
                <Button variant="secondary" className=' border border-neutral-600 cursor-pointer' onClick={()=>setOpenFilter(!openFilter)} > 
               <Funnel size={28} strokeWidth={3} absoluteStrokeWidth  /> Filter {filterCount}</Button>
               <FilterData openFilter={openFilter} setOpenFilter={setOpenFilter} searchValue={searchValue}
              setSearchValue={setSearchValue} setSearchCountry = {setSearchCountry}
               searchCountry={searchCountry} handleFilterChanges={handleFilterChanges}/>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                 <Button className='px-4 py-3 cursor-pointer bg-purple-500 text-white' onClick={()=>setOpenDialog(true)} >{selectedUser?"Edit":"Create +"}</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create Customer</DialogTitle>
                    <DialogDescription asChild>
                        <form className='flex flex-col ' onSubmit={handleSubmit(onSubmit)}>
                            <div className=' flex flex-col space-y-2.5 mb-1'>
                                <label className='text-[16px]'> Name</label>
                                <input {...register("name")}type="text" className='border p-1'/>
                                {errors.name && <p className='text-center text-red-500'>{errors.name.message}</p>}
                            </div>
                            <div className=' flex flex-col space-y-2.5 mb-1'>
                                <label className='text-[16px]'> Email</label>
                                <input  {...register("email")} type="text" className='border p-1 '/>
                                 {errors.email && <p className='text-center text-red-500'>{errors.email.message}</p>}
                            </div>
                            <label > Country</label>
                            <select className='p-2 border' {...register("country")} >
                                <option value="">--</option>
                                <option value="india">India</option>
                                <option value="usa">Usa</option>
                                <option value="brazil">Brazil</option>
                            </select>
                            {errors.country && <p className='text-center text-red-500'>{errors.country.message}</p>}

                            <div className='flex justify-center'>
                                <button type='submit' className='mt-4 px-5 py-3 bg-blue-500 rounded-2xl text-amber-50 font-bold cursor-pointer '> {selectedUser?"Update":"Create"}</button>
                            </div>
                        </form>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
             </Dialog>

             

              
            
             </div>
            

        </nav>

    </header>
  )
}

export default Header