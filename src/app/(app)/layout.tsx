"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockCurrentUser } from "@/lib/mock-data";
import { Home, Bug, Users, Briefcase, MessageSquareWarning, User, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/projects", icon: Briefcase, label: "Projects" },
  { href: "/complaints", icon: MessageSquareWarning, label: "Submit Complaint" },
  { href: "/admin", icon: Users, label: "Admin Panel" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
                <Logo className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-semibold font-headline text-primary-foreground group-data-[collapsible=icon]:hidden">
                    Dev-Connect
                </h1>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    tooltip={{ children: item.label }}
                    isActive={pathname === item.href}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <div className="p-4 mt-auto group-data-[collapsible=icon]:p-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-sidebar-accent">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={mockCurrentUser.avatar} alt={mockCurrentUser.name} />
                    <AvatarFallback>{mockCurrentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden group-data-[collapsible=icon]:hidden">
                    <p className="font-semibold truncate">{mockCurrentUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">Developer</p>
                </div>
                <Link href="/" passHref legacyBehavior>
                 <Button variant="ghost" size="icon" className="group-data-[collapsible=icon]:hidden">
                    <LogOut className="w-4 h-4" />
                 </Button>
                </Link>
            </div>
        </div>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center h-14 px-4 bg-background/80 backdrop-blur-sm border-b">
            <SidebarTrigger className="md:hidden" />
            <h2 className="text-lg font-semibold capitalize font-headline">
                {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </h2>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
