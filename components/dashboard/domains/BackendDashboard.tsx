import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function BackendDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      <div className="bg-zinc-950 p-8 rounded-3xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        <PageHeader
          title={`> Welcome_ ${user?.name ?? "User"} 🚀`}
          description="System initialized. Awaiting commands."
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3 font-mono">
        <DashboardCard>
          <h3 className="text-sm text-green-500 mb-2">~/tasks/pending</h3>
          <p className="text-4xl text-green-400 font-bold">
            [{tasks.length}]
          </p>
        </DashboardCard>

        <DashboardCard>
          <h3 className="text-sm text-green-500 mb-2">~/env/domain</h3>
          <p className="text-2xl text-green-400 font-bold">
            BACKEND
          </p>
        </DashboardCard>

        <DashboardCard>
          <h3 className="text-sm text-green-500 mb-2">~/logs/submissions</h3>
          <p className="text-4xl text-green-400 font-bold">
            [{submissions.length}]
          </p>
        </DashboardCard>
      </div>
    </div>
  );
}
