"use client";

import Link from "next/link";
import { navigationItems } from "./navigation.config";
import { ThemeToggle } from "./ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationProps {
  collapsed?: boolean;
}

export function Navigation({ collapsed = false }: NavigationProps) {
  return (
    <nav className="flex flex-col gap-2 h-full justify-between">
      <div className="grid gap-2">
        {navigationItems.map((item) => {
          const link = (
            <Link
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
            >
              <item.icon size={20} />

              {!collapsed && <span>{item.title}</span>}
            </Link>
          );

          return collapsed ? (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>

              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ) : (
            <div key={item.href}>{link}</div>
          );
        })}
      </div>
      <div className="w-full grid gap-4 my-3">
        <hr />
        <ThemeToggle />
      </div>
    </nav>
  );
}
