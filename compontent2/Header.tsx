"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Funnel } from 'lucide-react'
import { useSearchParams ,useRouter} from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BrandForm from '@/Forms/BrandForm'
import CategoryForm from '@/Forms/CategoryForm'

type Props = {
  onCreate: () => void;
  setSelectedBrand: (value: any) => void;
  type: "brand" | "category";
  searchValue: string ; 
  setSearchValue: (value: string) => void; 
  queryKey: string;
};

const Header = ({onCreate,setSelectedBrand,type,searchValue,setSearchValue,queryKey}:Props) => {
        

 // navigate function

const router = useRouter();
const [openDialog, setOpenDialog] = useState(false);





  const handleFilterChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

   

  return (
    <header className=' p-4 flex space-x-3 justify-between w-full '>
        <div> <h1 className='text-3xl font-bold'>{type ==="brand" ? " brands" : "Categories"}</h1></div>
        <nav className='flex space-x-4'>
            <input type="text" name='name' className=' px-2 py-2 rounded border-0 ring-1 ring-neutral-500' value={searchValue}
            onChange={handleFilterChanges} placeholder='Name..'/>
             <div className='flex items-center gap-2.5'>
                
       
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                 <Button className='px-4 py-3 cursor-pointer bg-purple-500 text-white' onClick={()=>setOpenDialog(true)} >Create +</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create </DialogTitle>
                    <DialogDescription asChild>
                      {
                        type === "brand"?
                           <BrandForm
                          selectedbrand={null}
                          onCreate={onCreate}
                          onClearEdit={() => setSelectedBrand(null)}
                          setOpenDialog={setOpenDialog}
                        />:
                        <CategoryForm
                        selectedCategory={null}
                          onCreate={onCreate}
                          onClearEdit={() => setSelectedBrand(null)}
                          setOpenDialog={setOpenDialog} />

                      }
                        
                  

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