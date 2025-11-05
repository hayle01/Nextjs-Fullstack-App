import React, { Children } from "react";
import MainSideBar from "../_components/MainSideBar";
import Navbar from "../_components/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* Navbar and Sidebar */}
      <div className="h-[65px] w-full md:pl-52 fixed inset-y-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex flex-col h-full w-52 bg-gray-100 fixed inset-y-0 z-50">
        <MainSideBar />
      </div>
      <main className="md:pl-52 h-full container mx-auto py-10 mt-10">{children}</main>
    </div>
  );
};

export default UserLayout;
