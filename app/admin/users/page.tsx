import { getUsers } from "./actions"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AddUserDialog } from "./add-user-dialog"

export default async function UsersPage() {
    const { data: users, success } = await getUsers()

    if (!success || !users) {
        return <div>Failed to load users</div>
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage application users, roles, and access.
                    </p>
                </div>
                <AddUserDialog />
            </div>
            <DataTable columns={columns} data={users} />
        </div>
    )
}
