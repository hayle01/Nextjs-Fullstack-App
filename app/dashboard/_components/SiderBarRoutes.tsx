"use client"
import { BookCheck, ViewIcon } from 'lucide-react';
import SideBarItem from './SideBarItem';
const adminRoutes = [
      {
        id: 1,
        icon: ViewIcon,
        label: "Design code",
        href: "dashboard/user/design",
        isShare: true
    },
    {
        id: 2,
        icon: ViewIcon,
        label: "List",
        href: "dashboard/user",
        isShare: true
    },
    {
        id: 3,
        icon: ViewIcon,
        label: "Dashboard",
        href: "dashboard/admin",
        isShare: false
    }
]
const userRoutes = [
    {
        id: 1,
        icon: ViewIcon,
        label: "Design code",
        href: "dashboard/user/design",
        isShare: true
    },
    {
        id: 2,
        icon: BookCheck,
        label: "List",
        href: "dashboard/user",
        isShare: true
    }
   
]
const SiderBarRoutes = ({role}: {role: string}) => {
    const routes = role === "admin" ? adminRoutes : userRoutes;
  return (
    <div className='flex flex-col w-full'>
        {routes.map((route) => (
            <SideBarItem
                id={route.id}
                icon={route.icon}
                label={route.label}
                isShare={route.isShare}
                href={route.href}
                key={route.id}
            />
        ))}
    </div>
  )
}

export default SiderBarRoutes