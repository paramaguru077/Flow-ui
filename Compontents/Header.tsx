"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Funnel } from 'lucide-react'
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
import ProductForm from '@/Forms/ProductForm'
import CustomerForm from '@/Forms/CustomerForm'

//import { ThemeToggle } from './ThemeToggle'
type HeaderPros = {
    type:"customer"| "product"
    onCreate:()=>void
    selectedUser: any;
   onClearEdit: ()=> void;
   openDialog: boolean;
   setOpenDialog:(value:boolean)=> void;
    searchValue:string;
    searchCountry:string;
   setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchCountry: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChanges: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

   
 //  handleFilterChanges: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}


const Header = ({type,onCreate,selectedUser,onClearEdit,openDialog,setOpenDialog, searchValue,searchCountry,setSearchValue,setSearchCountry,handleFilterChanges}:HeaderPros) => {
        
  
 // navigate function
  const searchParams = useSearchParams();
  const router = useRouter();



   // usestates for header
    const[openFilter,setOpenFilter] = useState(false);
  


// to count filter
    const filterApplied ={
        searchValue,
        searchCountry
    }
    let filterCount = Object.values(filterApplied).filter(value=>value.trim()!=="").length;


  
   
  return (
    <header className=' p-4 flex space-x-3 justify-between w-full '>
        <div></div>
        <nav className='flex space-x-4'>
            <input type="text" name='name' className=' px-2 py-2 rounded border-0 ring-1 ring-neutral-500' value={searchValue}
            onChange={handleFilterChanges} placeholder='Name..'/>
             <div className='flex items-center gap-2.5'>
                
                <Button variant="secondary" className=' border border-neutral-600 cursor-pointer' onClick={()=>setOpenFilter(!openFilter)} > 
               <Funnel size={28} strokeWidth={3} absoluteStrokeWidth  /> Filter {filterCount}</Button>
               <FilterData openFilter={openFilter} setOpenFilter={setOpenFilter} searchValue={searchValue}
          setSearchValue={setSearchValue} setSearchCountry={setSearchCountry}
          searchCountry={searchCountry} handleFilterChanges={handleFilterChanges} type={type}        />

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                 <Button className='px-4 py-3 cursor-pointer bg-purple-500 text-white' onClick={()=>setOpenDialog(true)} >Create +</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create {type}</DialogTitle>
                    <DialogDescription asChild>
                        
                     {type === "customer" ? (
                     <CustomerForm
                     selectedUser={selectedUser}
                     onCreate={onCreate}
                     onClearEdit={onClearEdit}
                     setOpenDialog={setOpenDialog}/>
                    ) : (
                     <ProductForm 
                     selectedUser ={selectedUser}
                     onCreate={onCreate}
                     onClearEdit={onClearEdit}
                     setOpenDialog={setOpenDialog}/>
                    )}
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
             </Dialog>
             

             

              
            
             </div>
            

        </nav>

    </header>
  )
}

export default Header;