import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import UserTable from "@/Compontents/UserTable";

export default function AppSidebar() {
  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Sidebar */}
      <aside className="w-full lg:w-60  ">
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup />
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
      </aside>

      {/* Main Content */}
      <main className="grow h-screen ml-8">
        
          <UserTable />
       
      </main>
    </div>
  );
}
