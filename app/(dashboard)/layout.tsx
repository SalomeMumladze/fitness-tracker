import { AppSidebar } from "@/components/layout/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />

      <main className="flex-1 p-6 w-full">{children}</main>
    </div>
  );
}
