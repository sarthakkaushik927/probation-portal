import { Button } from "@/components/ui/button";

export default function ReviewSubmissionPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Submission Review
      </h1>

      <div className="space-y-6 rounded-3xl border p-8">

        <div>
          <h3 className="font-semibold">
            User
          </h3>

          <p>Sarthak Sharma</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Task
          </h3>

          <p>Portfolio Website</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Github Repository
          </h3>

          <a
            href="#"
            className="text-blue-500 underline"
          >
            github.com/user/project
          </a>
        </div>

        <div>
          <h3 className="font-semibold">
            Demo Link
          </h3>

          <a
            href="#"
            className="text-blue-500 underline"
          >
            project.vercel.app
          </a>
        </div>

        <div>
          <h3 className="font-semibold">
            Remarks
          </h3>

          <p>
            Completed all required features.
          </p>
        </div>

        <div className="flex gap-4">
          <Button>
            Approve
          </Button>

          <Button variant="destructive">
            Reject
          </Button>
        </div>
      </div>
    </main>
  );
}