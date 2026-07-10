import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function FrontendDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="bg-gradient-to-r from-pink-500/20 to-violet-500/20 p-8 rounded-3xl border border-pink-500/30">
        <PageHeader
          title={`Welcome to Frontend, ${user?.name ?? "User"} 🎨`}
          description="Crafting beautiful interfaces"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard>
          <div className="bg-pink-500/10 p-4 rounded-xl mb-4 inline-block">
            <h3 className="text-sm font-medium text-pink-400">UI Tasks</h3>
          </div>
          <p className="text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">
            {tasks.length}
          </p>
        </DashboardCard>

        <DashboardCard>
          <div className="bg-violet-500/10 p-4 rounded-xl mb-4 inline-block">
            <h3 className="text-sm font-medium text-violet-400">Current Domain</h3>
          </div>
          <p className="text-3xl font-bold tracking-tight">
            Frontend
          </p>
        </DashboardCard>

        <DashboardCard>
          <div className="bg-fuchsia-500/10 p-4 rounded-xl mb-4 inline-block">
            <h3 className="text-sm font-medium text-fuchsia-400">Components Built</h3>
          </div>
          <p className="text-5xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40">
            {submissions.length}
          </p>
        </DashboardCard>
      </div>
    </div>
  );
}
