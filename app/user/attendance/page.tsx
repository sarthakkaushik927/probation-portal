import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import UserAttendanceTable from "@/components/attendance/UserAttendanceTable";

export default async function UserAttendancePage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const attendance = await prisma.attendance.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  const stats = {
    total: attendance.length,
    present: attendance.filter((a) => a.status === "PRESENT").length,
    absent: attendance.filter((a) => a.status === "ABSENT").length,
    leave: attendance.filter((a) => a.status === "LEAVE").length,
  };

  const attendancePercentage = stats.total > 0 
    ? ((stats.present / stats.total) * 100).toFixed(1) 
    : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Attendance"
        description="View your daily attendance records and statistics"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Attendance Rate" value={`${attendancePercentage}%`} />
        <StatCard title="Total Days" value={stats.total} />
        <StatCard title="Present" value={stats.present} />
        <StatCard title="Absent/Leave" value={stats.absent + stats.leave} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent History</h2>
        <UserAttendanceTable attendance={attendance} />
      </div>
    </div>
  );
}
