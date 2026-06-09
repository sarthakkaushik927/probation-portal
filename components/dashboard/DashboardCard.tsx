export default function DashboardCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border p-6">
      {children}
    </div>
  );
}