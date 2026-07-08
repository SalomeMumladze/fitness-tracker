import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TooltipProvider>
            <SidebarProvider>
              <Toaster richColors position="top-center" />
              {children}
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
