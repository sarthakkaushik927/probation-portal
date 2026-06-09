import { CheckCircle2 } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface TaskSubmittedProps {
  status?: string;
}

export default function TaskSubmitted({ status = "PENDING" }: TaskSubmittedProps) {
  return (
    <DashboardCard>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold tracking-tight">Task Submitted</h2>
        <p className="mt-2 text-muted-foreground max-w-xs mx-auto">
          You have already submitted this task. Your current submission status is{" "}
          <span className="font-semibold text-foreground">{status}</span>.
        </p>
      </div>
    </DashboardCard>
  );
}
