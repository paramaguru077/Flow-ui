"use client";  // Ensure it's client component

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const defaultOpen = true;

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="flex min-h-screen bg-neutral-400/10">
      <AppSidebar />
      <main className="flex-1 p-1">
        <SidebarTrigger />
        <div className="max-w-7xl mx-auto p-1">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
