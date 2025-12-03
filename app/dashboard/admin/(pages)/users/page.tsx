import prisma from "@/prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { UserForm } from "./_components/UserForm";
import { columns } from "./_components/columns";

export default async function UsersPage() {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      emailVerified: true,
    },
  });

  const users = data.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
    emailVerified: u.emailVerified ? u.emailVerified.toISOString() : null,
  }));

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage application users, roles, and access.
          </p>
        </div>
        <UserForm />
      </div>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={users}
        filter="email"
        columnFiltersConfig={[
          {
            columnKey: "role",
            options: [
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ],
          }
        ]}
        showColumnToggle={true}
      />
    </div>
  );
}
