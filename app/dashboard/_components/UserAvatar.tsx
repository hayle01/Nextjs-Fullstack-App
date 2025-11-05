"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock } from "lucide-react";
import { signOut } from "next-auth/react";

export interface UserProps {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string 
}
const UserAvatar = ({user}: {user: UserProps}) => {
  return (
    <div className="flex items-center justify-around space-x-4">
      
      <div className="flex items-center justify-between space-x-2">
        <Avatar>
          <AvatarImage src={user?.image!} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="text-base text-slate-600 font-[500]">{user?.name!}</span>
      </div>

      <Lock onClick={() => signOut()}  className="text-slate-700 cursor-pointer" />
    </div>
  );
};

export default UserAvatar;
