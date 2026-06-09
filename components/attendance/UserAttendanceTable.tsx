import { Attendance, AttendanceStatus } from "@prisma/client";

interface UserAttendanceTableProps {
  attendance: Attendance[];
}

export default function UserAttendanceTable({
  attendance,
}: UserAttendanceTableProps) {
  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "PRESENT":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "ABSENT":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      case "LEAVE":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border">
      <table className="w-full text-left border-collapse">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {attendance.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                No attendance records found.
              </td>
            </tr>
          ) : (
            attendance.map((record) => (
              <tr key={record.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  {new Date(record.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
