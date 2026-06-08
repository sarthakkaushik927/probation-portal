import Link from "next/link";

type UserCardProps = {
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    domain: string | null;
  };
};

export default function UserCard({
  user,
}: UserCardProps) {
  return (
    <Link href={`/admin/users/${user.id}`}>
      <div className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl">
        
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            {user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div>
            <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
              {user.name ?? "Unnamed User"}
            </h2>

            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Role
            </span>

            <span className="rounded-full border px-3 py-1 text-xs font-medium">
              {user.role}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Domain
            </span>

            <span className="rounded-full border px-3 py-1 text-xs font-medium">
              {user.domain ?? "Not Assigned"}
            </span>
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-right">
          <span className="text-sm font-medium text-primary">
            View Details →
          </span>
        </div>

      </div>
    </Link>
  );
}