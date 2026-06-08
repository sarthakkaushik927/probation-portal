import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DomainForm from "@/components/forms/DomainForm";

export default async function UserDetailsPage({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = await params;

    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            submissions: true,
        },
    });

    if (!user) {
        notFound();
    }

    return (
        <div className="p-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <h1 className="mb-8 text-4xl font-bold">
                    {user.name}
                </h1>

                <div className="grid gap-4 md:grid-cols-2">

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Email
                        </p>

                        <p className="font-medium">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Role
                        </p>

                        <p className="font-medium">
                            {user.role}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Domain
                        </p>

                        <p className="font-medium">
                            {user.domain ?? "Not Assigned"}
                        </p>
                        <DomainForm

                            userId={user.id}
                            currentDomain={user.domain}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Joined
                        </p>

                        <p className="font-medium">
                            {user.createdAt.toLocaleDateString()}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}