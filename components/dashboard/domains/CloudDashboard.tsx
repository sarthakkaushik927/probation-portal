import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function CloudDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="bg-sky-50 dark:bg-sky-950/20 p-8 rounded-2xl border border-sky-100 dark:border-sky-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-sky-200/50 dark:text-sky-900/20">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 19c-1.5 0-2.8-.9-3.3-2.2-.4.1-.7.2-1.2.2-1.9 0-3.5-1.6-3.5-3.5 0-.2 0-.4.1-.5C8 12.6 7 11.4 7 10c0-1.7 1.3-3 3-3 .2 0 .4 0 .5.1C11.5 5.3 13.6 4 16 4c2.8 0 5 2.2 5 5 0 .2 0 .4-.1.5 1.3.4 2.1 1.7 2.1 3 0 1.7-1.3 3-3 3h-2.5z"/></svg>
        </div>
        <div className="relative z-10">
          <PageHeader
            title={`Welcome to Cloud, ${user?.name ?? "User"} ☁️`}
            description="Scaling to new heights."
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <DashboardCard>
          <div className="border-l-4 border-sky-500 pl-4 py-2">
            <h3 className="text-sm font-medium text-sky-600 dark:text-sky-400">Instances (Tasks)</h3>
            <p className="mt-2 text-4xl font-light text-slate-700 dark:text-slate-200">
              {tasks.length}
            </p>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="border-l-4 border-sky-400 pl-4 py-2">
            <h3 className="text-sm font-medium text-sky-600 dark:text-sky-400">Zone (Domain)</h3>
            <p className="mt-2 text-2xl font-light text-slate-700 dark:text-slate-200">
              CLOUD
            </p>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="border-l-4 border-sky-600 pl-4 py-2">
            <h3 className="text-sm font-medium text-sky-600 dark:text-sky-400">Deployments (Submissions)</h3>
            <p className="mt-2 text-4xl font-light text-slate-700 dark:text-slate-200">
              {submissions.length}
            </p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
