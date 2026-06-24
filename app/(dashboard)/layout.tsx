import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>

        {children}
      </main>
    </div>
  );
}
