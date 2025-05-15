import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import UserTable from '@/Compontents/UserTable'
const main = () => {
  return (
    <div className=''>
     <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    <main className=''>
        <UserTable/>
        

    </main>


    </div>

  )
}

export default main