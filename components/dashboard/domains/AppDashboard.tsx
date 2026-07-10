import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function AppDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500 max-w-sm mx-auto md:max-w-full">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-900/20">
        <PageHeader
          title={`Hi, ${user?.name?.split(' ')[0] ?? "User"} 📱`}
          description="Let's build great apps today."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{tasks.length}</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Pending Tasks</h3>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-full mb-4">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">APP</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Your Domain</h3>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
              <span className="text-3xl font-black text-purple-600 dark:text-purple-400">{submissions.length}</span>
            </div>
            <h3 className="text-sm font-semibold text-muted-foreground">Submissions</h3>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
