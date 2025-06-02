import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import Category from "@/Compontents/Category";
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
      <main className="grow bg-neutral-50  ml-8">
        <Category/>
       
      </main>
    </div>
  );
}
