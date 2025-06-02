import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex flex-row gap-3 justify-center items-center h-screen'>
        
       <Link href='/sign-in'> <button className='bg-purple-500 text-white px-6 py-3 rounded cursor-pointer'>Sign In</button></Link>
       <Link href='/sign-up'> <button className='bg-purple-500 text-white px-6 py-3 rounded cursor-pointer'>Sign Up</button>
</Link>


 
     
    </div>
  )
}

export default page