import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function MlDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-1000">
      <div className="bg-slate-950 p-8 rounded-none border-l-4 border-fuchsia-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="relative z-10">
          <PageHeader
            title={`Model: ${user?.name ?? "User"} | Status: Training 🧠`}
            description="Optimizing loss function... Welcome to ML/AI."
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard>
          <div className="p-2 border border-fuchsia-500/20 bg-fuchsia-500/5">
            <h3 className="text-xs uppercase tracking-widest text-fuchsia-400 mb-2">Epochs (Tasks)</h3>
            <div className="flex items-end gap-2">
              <p className="text-5xl font-mono text-slate-100">
                {tasks.length}
              </p>
              <span className="text-sm text-fuchsia-500 mb-1 font-mono">.00</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="p-2 border border-fuchsia-500/20 bg-fuchsia-500/5">
            <h3 className="text-xs uppercase tracking-widest text-fuchsia-400 mb-2">Architecture</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-mono text-slate-100">
                ML / AI
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="p-2 border border-fuchsia-500/20 bg-fuchsia-500/5">
            <h3 className="text-xs uppercase tracking-widest text-fuchsia-400 mb-2">Outputs (Submissions)</h3>
            <div className="flex items-end gap-2">
              <p className="text-5xl font-mono text-slate-100">
                {submissions.length}
              </p>
              <span className="text-sm text-fuchsia-500 mb-1 font-mono">/ {tasks.length || 1}</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
