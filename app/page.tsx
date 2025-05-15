import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>

      <Link href="/component"><Button variant="default" className='text-white bg-blue-700 cursor-pointer'> Login</Button>
      </Link>

     
    </div>
  )
}

export default page