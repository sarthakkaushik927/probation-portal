import Link from "next/link";

type UserTaskCardProps = {
  task: {
    id: string;
    title: string;
    description: string;
    domain: string;
    deadline: Date;
  };
};

export default function UserTaskCard({
  task,
}: UserTaskCardProps) {
  return (
    <Link href={`/user/tasks/${task.id}`}>
      <div className="cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:scale-[1.01]">

        <h2 className="text-xl font-semibold">
          {task.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-muted-foreground">
          {task.description}
        </p>

        <div className="mt-4 flex gap-3">
          <span className="rounded-full border px-3 py-1 text-sm">
            {task.domain}
          </span>

          <span className="rounded-full border px-3 py-1 text-sm">
            {task.deadline.toLocaleDateString()}
          </span>
        </div>

      </div>
    </Link>
  );
}