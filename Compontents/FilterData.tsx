import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
type HeaderPros ={
    openFilter:boolean;
    setOpenFilter:(value:boolean)=> void;
    searchValue:string;
    searchCountry:string
   // handleFilterChange:
    handleFilterChanges: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setSearchValue:(value:string)=> void;
    setSearchCountry:(value:string)=> void
   

}

const FilterData = ({openFilter,setOpenFilter,searchValue,searchCountry,handleFilterChanges,setSearchCountry,setSearchValue}:HeaderPros) => {
  return (
    <div>
        <Sheet open={openFilter} onOpenChange={setOpenFilter}>
            
            <SheetContent side='right'   className="
          data-[state=open]:animate-slideIn 
          data-[state=closed]:animate-slideOut
        ">
                <SheetHeader className='mt-6 p-3'>
                <SheetTitle className='text-2xl tracking-wide ml-7 text-blue-800/90 '>Filter</SheetTitle>
                <div className='w-full h-1 bg-blue-500/70 rounded-2xl '></div>
                <SheetDescription className='mt-3 p-3 flex-col'>
                    <label className='mb-2'>Name</label>
                    <input type="text" name='name' className=' px-2 py-2 rounded border-0 ring-1 ring-blue-500 w-full outline-none' value={searchValue}
            onChange={handleFilterChanges} placeholder='Search'/>
                     <div className='flex flex-col space-y-2'>
                           <label className='mt-2'>Country</label>
                     <select name='country' className='p-2  w-full ring-1  rounded-xl ring-blue-500 outline-none' value={searchCountry} 
                     onChange={handleFilterChanges} >
                                <option value="">All</option>
                                <option value="india">India</option>
                                <option value="usa">Usa</option>
                                <option value="brazil">Brazil</option>
                    </select>
                   
                     </div>
                     <div className=' flex justify-end mt-7'>
                        <button type='submit' className='mt-4 px-6 py-3 bg-purple-800/80 rounded-xl text-amber-50 font-bold cursor-pointer ' onClick={()=>setOpenFilter(false)}> Done</button>

                     </div>
                          

                    
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    </div>
  )
}

export default FilterData