import PageHeader from "@/components/dashboard/PageHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface DashboardProps {
  user: any;
  tasks: any[];
  submissions: any[];
}

export default function UiuxDashboard({ user, tasks, submissions }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="border-b-2 border-foreground pb-8">
        <PageHeader
          title={`Hello, ${user?.name ?? "User"}.`}
          description="Design is not just what it looks like and feels like. Design is how it works."
        />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="border border-foreground p-8 hover:bg-foreground hover:text-background transition-colors duration-500">
          <h3 className="text-xs uppercase tracking-widest mb-8 font-semibold">Tasks</h3>
          <p className="text-6xl font-light">{tasks.length}</p>
        </div>

        <div className="border border-foreground p-8 bg-foreground text-background">
          <h3 className="text-xs uppercase tracking-widest mb-8 font-semibold">Domain</h3>
          <p className="text-3xl font-light">UI / UX</p>
        </div>

        <div className="border border-foreground p-8 hover:bg-foreground hover:text-background transition-colors duration-500">
          <h3 className="text-xs uppercase tracking-widest mb-8 font-semibold">Submissions</h3>
          <p className="text-6xl font-light">{submissions.length}</p>
        </div>
      </div>
    </div>
  );
}
