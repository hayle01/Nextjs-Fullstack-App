import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import MainSideBar from "./MainSideBar";
import { Menu } from "lucide-react";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { getServerSession } from 'next-auth'
import { AuthOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserAvatar from "./UserAvatar";

const MobileMenu = async () => {
  const session = await getServerSession(AuthOptions);
  return (
    <div>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all">
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0">
          <div className=" flex flex-col space-y-2">
            <MainSideBar />
            <div className="absolute bottom-0 w-full p-6 border-t">
            <UserAvatar user={session?.user!} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
