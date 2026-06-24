"use client";

import { MenuIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

import { Navigation } from "./Navigation";

export function MobileDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold p-3 text-base">FT</span>

          <DrawerClose asChild>
            <Button size="xs">
              <X className="h-10 w-10" />
            </Button>
          </DrawerClose>
        </div>
        <Navigation />
      </DrawerContent>
    </Drawer>
  );
}
