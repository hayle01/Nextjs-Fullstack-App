"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateUserRole, deleteUser } from "./actions"
import { toast } from "sonner"

export type User = {
    id: string
    name: string | null
    email: string | null
    role: string
    image: string | null
    createdAt: Date
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => {
            const user = row.original
            const initials = user.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "U"

            return (
                <Avatar>
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const user = row.original

            const handleRoleChange = async (newRole: string) => {
                const result = await updateUserRole(user.id, newRole)
                if (result.success) {
                    toast.success("Role updated successfully")
                } else {
                    toast.error("Failed to update role")
                }
            }

            return (
                <Select defaultValue={user.role} onValueChange={handleRoleChange}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                    </SelectContent>
                </Select>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: () => {
            return <Badge variant="secondary">Active</Badge>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            return new Date(row.original.createdAt).toLocaleDateString()
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            const handleDelete = async () => {
                if (confirm("Are you sure you want to delete this user?")) {
                    const result = await deleteUser(user.id)
                    if (result.success) {
                        toast.success("User deleted successfully")
                    } else {
                        toast.error("Failed to delete user")
                    }
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
