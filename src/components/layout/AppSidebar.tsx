import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Camera, 
  Search, 
  Calendar,
  Sparkles,
  LogOut 
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const navigationItems = [
  { 
    title: 'Dashboard', 
    url: '/dashboard', 
    icon: LayoutDashboard 
  },
  { 
    title: 'Skin Assessment', 
    url: '/dashboard/assessment', 
    icon: FileText 
  },
  { 
    title: 'Facial Analysis', 
    url: '/dashboard/facial-analysis', 
    icon: Camera 
  },
  { 
    title: 'Ingredient Checker', 
    url: '/dashboard/ingredient-checker', 
    icon: Search 
  },
  { 
    title: 'Routine Generator', 
    url: '/dashboard/routine-generator', 
    icon: Calendar 
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === 'collapsed';
  
  const getNavClasses = (isActiveLink: boolean) =>
    isActiveLink 
      ? 'bg-primary text-primary-foreground font-medium' 
      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground';

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-600" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-display font-bold text-gray-900">
                Twacha
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavClasses(isActive)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 border-t">
          {!isCollapsed && user && (
            <div className="text-xs text-muted-foreground mb-2 truncate">
              {user.email}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}