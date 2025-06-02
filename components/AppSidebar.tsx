"use client";
import { useRouter } from "next/navigation"; // for App Router
import { ChartPie, Gift, ContactRound, Wrench } from "lucide-react";
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
import UserInfo from "@/compontent2/UserInfo";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: ChartPie },
  { title: "Order", url: "/orders", icon: Gift },
  { title: "Customer", url: "/customer", icon: ContactRound },
];

export function AppSidebar() {
  const router = useRouter();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(value);
    }
  };

  return (
    <Sidebar className="p-3">
      <SidebarContent className="mt-1">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-violet-600 text-4xl p-4 mt-2 mb-7">
            <Image src={logo} alt="logo" width={120} height={40} />
          </SidebarGroupLabel>
          <div className="w-full h-1 bg-neutral-800 rounded dark:bg-black"></div>
          <UserInfo />
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
              <div className="flex items-center mt-4">
                <Wrench className="p-1 mt-2 ml-1" />
                <select
                  className="text-xl outline-none grow mt-2 ml-2"
                  onChange={handleSelectChange}
                >
                  <option value="">Warehouse</option>
                  <option value="/products">Products</option>
                  <option value="/brands">Brands</option>
                  <option value="/category">Categories</option>
                </select>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
