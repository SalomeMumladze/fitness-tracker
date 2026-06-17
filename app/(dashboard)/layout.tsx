export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "250px", background: "#111", color: "white" }}>
        <h2>Fitness App</h2>

        <nav>
          <p>Dashboard</p>
          <p>Workouts</p>
          <p>Nutrition</p>
          <p>Progress</p>
          <p>Goals</p>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
