import { Button } from "@/components/ui/button";

export default function TaskSubmissionPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Portfolio Website
        </h1>

        <p className="mt-2 text-muted-foreground">
          Build a responsive portfolio website using
          Next.js and Tailwind CSS.
        </p>
      </div>

      <div className="rounded-3xl border p-8">
        <div className="space-y-6">

          <div>
            <label className="mb-2 block font-medium">
              GitHub Repository
            </label>

            <input
              placeholder="https://github.com/username/project"
              className="h-11 w-full rounded-xl border px-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Demo Link
            </label>

            <input
              placeholder="https://your-project.vercel.app"
              className="h-11 w-full rounded-xl border px-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Remarks
            </label>

            <textarea
              rows={5}
              placeholder="Additional notes..."
              className="w-full rounded-xl border p-4"
            />
          </div>

          <Button className="w-full">
            Submit Task
          </Button>

        </div>
      </div>
    </main>
  );
}