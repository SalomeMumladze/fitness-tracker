"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Navigation } from "./Navigation";
import { MobileDrawer } from "./MobileDrawer";

export function AppSidebar() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const collapsed = state === "collapsed";

  return (
    <>
      {!isMobile ? (
        <div>
          <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center  justify-between">
              <div className="flex items-center gap-3 rounded-md px-3hover:bg-mute w-full justify-between">
                {!collapsed && (
                  <span className="font-semibold">Fitness Tracker</span>
                )}
                <SidebarTrigger />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Navigation collapsed={collapsed} />
            </SidebarContent>
          </Sidebar>
        </div>
      ) : (
        <div>
          <MobileDrawer />
        </div>
      )}
    </>
  );
}
