"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { UserProps } from "./UserAvatar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import { LucideUserRoundCog } from "lucide-react";

interface Props {
  user: UserProps;
}

const UserAvatarDropdown: React.FC<Props> = ({ user }) => {
  const router = useRouter();

  const handleNavigate = (href: string) => router.push(href);

  return (
    <div className="flex items-center space-x-2">
        <span className="text-base text-slate-600 font-[500]">{user?.name!}</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-11 h-11 border border-gray-300 rounded-full">
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
          <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem className="px-4 py-2" onClick={() => handleNavigate("/profile")}>
          <LucideUserRoundCog className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-2" onClick={() => signOut()}>
          <IoIosLogOut className="mr-2 h-4 w-4" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};

export default UserAvatarDropdown;
