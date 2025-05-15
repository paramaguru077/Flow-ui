import { ChartPie, Gift, ContactRound, Wrench, Settings } from "lucide-react";
import Image from "next/image";
import logo from "../public/flow2.png";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: ChartPie },
  { title: "Order", url: "/order", icon: Gift },
  { title: "Customer", url: "/customer", icon: ContactRound },
  { title: "Warehouse", url: "/warehouse", icon: Wrench },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="mt-6">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-violet-600 text-4xl p-4 mt-2 mb-7">
            <Image src={logo} alt="logo" width={120} height={40} />
          </SidebarGroupLabel>
          <div className="w-full h-1 bg-neutral-800 rounded"></div>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-4">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
