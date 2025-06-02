"use client"
import React from 'react'
import { Settings } from 'lucide-react'
import { signOut, useSession } from '@/lib/auth-client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const UserInfo = () => {
  const { data } = useSession();
  
    const handleSignOut = async()=>{
         try{
            await signOut();
            window.location.href ="/";
         }
         catch(err){
             console.log("error",err)
         }

    }

  return (
    <div className='my-4'>
      <div className='flex items-center  space-x-2'>
        <img
          src={data?.user?.image || '/default-avatar.png'}
          alt="User Avatar"
          className='rounded-full w-16 h-16 object-cover'
        />

        <div className='flex flex-col space-y-1'>
          <h1 className='font-bold text-base'>{data?.user?.name}</h1>
          <p className='text-xs text-gray-500'>{data?.user?.email}</p>
        </div>

        <div className=''>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-full mr-2 cursor-pointer">
                <Settings size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default UserInfo;
