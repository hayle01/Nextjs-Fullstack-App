import React, { use } from 'react'
import SiderBarRoutes from './SiderBarRoutes'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { User } from '@prisma/client'
import UserAvatar from './UserAvatar'

const MainSideBar = async () => {
    const session = await getServerSession(AuthOptions);
    console.log(session)
    const userRole = (session?.user as User).role;
  return (
    <div className='relative h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
        <div className='p-4'>
            <h1 className='text-2xl text-slate-500 font-semibold'>Saasify</h1>
        </div>
        <div className='flex flex-col w-full'>
            <SiderBarRoutes role={userRole} />
        </div>
        {/* user Avatar */}
        <div className='absolute bottom-0 w-full p-6 border-t'>
          <UserAvatar user={session?.user!} />
        </div>
    </div>
  )
}

export default MainSideBar