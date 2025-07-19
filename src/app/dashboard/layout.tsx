import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTitle,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { Sparkles } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            <span>Kerala Dev Insights</span>
          </SidebarTitle>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
