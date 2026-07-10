import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function DefaultDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title={`Welcome, ${user?.name ?? "User"} 👋`}
        description="Overview of your probation progress"
      />

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard>
          <h3 className="text-sm text-muted-foreground">Assigned Tasks</h3>
          <p className="mt-2 text-4xl font-bold">{tasks.length}</p>
        </DashboardCard>

        <DashboardCard>
          <h3 className="text-sm text-muted-foreground">Domain</h3>
          <p className="mt-2 text-2xl font-bold">{user?.domain ?? "Not Assigned"}</p>
        </DashboardCard>

        <DashboardCard>
          <h3 className="text-sm text-muted-foreground">Submissions</h3>
          <p className="mt-2 text-4xl font-bold">{submissions.length}</p>
        </DashboardCard>
      </div>
    </div>
  );
}
