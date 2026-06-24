import { LayoutDashboard, Dumbbell } from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workouts",
    href: "/workouts",
    icon: Dumbbell,
  },
] as const;
