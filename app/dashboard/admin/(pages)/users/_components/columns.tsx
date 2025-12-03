"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserForm } from "./UserForm";
import DeleteAlertDialog from "./DeleteAlertDialog";
import RoleSelect from "./RoleSelect";
import { useEffect, useState } from "react";

export type UserProps = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
  createdAt: string;
  emailVerified: string | null;
};

interface CreatedCellProps {
  date: string;
}

export const CreatedCell: React.FC<CreatedCellProps> = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const d = new Date(date);
    setFormattedDate(d.toLocaleDateString("en-US"));
  }, [date]);

  return <span>{formattedDate}</span>;
};

export const columns: ColumnDef<UserProps>[] = [
  {
    accessorKey: "image",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";

      return (
        <Avatar>
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <RoleSelect id={row.original.id} currentRole={row.original.role} />
    ),
  },

  {
    accessorKey: "emailVerified",
    header: "Status",
    cell: ({ row }) =>
      row.original.emailVerified ? (
        <span className="bg-green-600 text-white px-2 py-1 text-xs rounded">
          Verified
        </span>
      ) : (
        <span className="bg-gray-400 text-white px-2 py-1 text-xs rounded">
          Unverified
        </span>
      )
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => <CreatedCell date={row.original.createdAt} />,
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex items-center gap-3">
          <UserForm
            initialData={{
              id: user.id,
              name: user.name ?? undefined,
              email: user.email ?? undefined,
              role: user.role ?? undefined,
              image: user.image ?? undefined,
              createdAt: user.createdAt ?? undefined,
              emailVerified: user.emailVerified ?? undefined,
            }}
          />

          <DeleteAlertDialog id={user.id} name={user.name} />
        </div>
      );
    },
  },
];
