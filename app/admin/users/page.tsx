import { prisma } from "@/lib/prisma";
import UserCard from "@/components/dashboard/UserCard";
import PageHeader from "@/components/dashboard/PageHeader";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 md:p-8">
      <PageHeader
        title="Users"
        description="Manage all users in the portal"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}