import { prisma } from "@/lib/prisma";

import PageHeader from "@/components/dashboard/PageHeader";
import AttendanceForm from "@/components/attendance/AttendanceForm";


export default async function AttendancePage() {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },

    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="p-4 md:p-8">
      <PageHeader
        title="Attendance"
        description="Mark daily attendance"
      />

      <AttendanceForm users={users} />
    </main>
  );
}