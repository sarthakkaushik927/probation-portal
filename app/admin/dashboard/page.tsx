import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";

export default function AdminDashboard() {
  return (
    <main className="p-8">
      <PageHeader
        title="Admin Dashboard"
        description="Manage probation tasks and users"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total Users" value={24} />
        <StatCard title="Active Tasks" value={12} />
        <StatCard title="Pending Reviews" value={7} />
      </div>
    </main>
  );
}