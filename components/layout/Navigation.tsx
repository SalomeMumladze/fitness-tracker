"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigation.config";
import { ThemeToggle } from "./ThemeToggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

interface NavigationProps {
  collapsed?: boolean;
}

export function Navigation({ collapsed = false }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between h-full">
      <div className="grid gap-2">
        {navigationItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          const link = (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-accent",
              )}
            >
              <item.icon size={20} />

              {!collapsed && <span>{item.title}</span>}

              {!collapsed && isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
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
        <hr className="border-border" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
