"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TaskForm({
  onSubmit,
}: {
  onSubmit: (
    title: string,
    description: string,
    domain: string,
    deadline: string
  ) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("FRONTEND");
  const [deadline, setDeadline] = useState("");

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="space-y-5">

        <div>
          <label className="mb-2 block">
            Title
          </label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="h-11 w-full rounded-xl border px-4"
            placeholder="Portfolio Website"
          />
        </div>

        <div>
          <label className="mb-2 block">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="min-h-32 w-full rounded-xl border p-4"
            placeholder="Build a portfolio website..."
          />
        </div>

        <div>
          <label className="mb-2 block">
            Domain
          </label>

          <select
            value={domain}
            onChange={(e) =>
              setDomain(e.target.value)
            }
            className="h-11 w-full rounded-xl border px-4"
          >
            <option value="FRONTEND">
              FRONTEND
            </option>

            <option value="BACKEND">
              BACKEND
            </option>

            <option value="CLOUD">
              CLOUD
            </option>

            <option value="AIML">
              AIML
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            Deadline
          </label>

          <input
            type="date"
            value={deadline}
            onChange={(e) =>
              setDeadline(e.target.value)
            }
            className="h-11 w-full rounded-xl border px-4"
          />
        </div>

        <Button
          disabled={loading}
          className="w-full"
          onClick={async () => {
            try {
              setLoading(true);

              await onSubmit(
                title,
                description,
                domain,
                deadline
              );
            } catch (error) {
              if (error instanceof Error) {
                alert(error.message);
              } else {
                alert(
                  "Something went wrong"
                );
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading
            ? "Creating..."
            : "Create Task"}
        </Button>

      </div>
    </div>
  );
}