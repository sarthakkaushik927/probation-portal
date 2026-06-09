"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { saveAttendance } from "@/actions/attendance/save-attendance";

export default function AttendanceForm({
  users,
}: {
  users: any[];
}) {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] =
    useState(false);

  const [attendance, setAttendance] =
    useState(
      users.map((user) => ({
        userId: user.id,
        status: "PRESENT",
      }))
    );

  const updateStatus = (
    userId: string,
    status:
      | "PRESENT"
      | "ABSENT"
      | "LEAVE"
  ) => {
    setAttendance((prev) =>
      prev.map((record) =>
        record.userId === userId
          ? {
              ...record,
              status,
            }
          : record
      )
    );
  };

  return (
    <div className="mt-6 space-y-6">

      <div className="rounded-2xl border p-4">
        <label className="mb-2 block text-sm font-medium">
          Attendance Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="h-11 w-full rounded-xl border px-4"
        />
      </div>

      <div className="space-y-4">

        {users.map((user) => {
          const current =
            attendance.find(
              (a) =>
                a.userId === user.id
            );

          return (
            <div
              key={user.id}
              className="rounded-2xl border p-4"
            >
              <div className="mb-4">

                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>

              </div>

              <div className="flex flex-wrap gap-2">

                <Button
                  variant={
                    current?.status ===
                    "PRESENT"
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    updateStatus(
                      user.id,
                      "PRESENT"
                    )
                  }
                >
                  Present
                </Button>

                <Button
                  variant={
                    current?.status ===
                    "ABSENT"
                      ? "destructive"
                      : "outline"
                  }
                  onClick={() =>
                    updateStatus(
                      user.id,
                      "ABSENT"
                    )
                  }
                >
                  Absent
                </Button>

                <Button
                  variant={
                    current?.status ===
                    "LEAVE"
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() =>
                    updateStatus(
                      user.id,
                      "LEAVE"
                    )
                  }
                >
                  Leave
                </Button>

              </div>
            </div>
          );
        })}

      </div>

      <Button
        disabled={loading}
        className="w-full"
        onClick={async () => {
          try {
            setLoading(true);

            await saveAttendance(
              date,
              attendance as any
            );

            alert(
              "Attendance saved successfully"
            );
          } catch {
            alert(
              "Failed to save attendance"
            );
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading
          ? "Saving..."
          : "Save Attendance"}
      </Button>

    </div>
  );
}