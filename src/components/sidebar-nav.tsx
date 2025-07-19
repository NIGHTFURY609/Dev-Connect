'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, LayoutGrid, LogOut, User } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/dashboard/projects', icon: Briefcase, label: 'Projects' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem>
        <Link href="/login">
            <SidebarMenuButton tooltip="Logout">
                <LogOut />
                <span>Logout</span>
            </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
