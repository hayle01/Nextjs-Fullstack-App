import React from 'react'
import UserAvatar from './UserAvatar'
import { getServerSession } from 'next-auth'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HiOutlineCreditCard } from "react-icons/hi2";
import { AuthOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { User } from '@prisma/client';
import MobileMenu from './MobileMenu';

const Navbar = async () => {
    const session = await getServerSession(AuthOptions);
    const userCredit = (session?.user as User).credit;
  return (
    <div className='h-full p-4 border-b flex items-center justify-between bg-white shadow-sm'>
        <div className='flex justify-items-center items-center space-x-4'>
        {/* Credit Balance */}
        <div className='text-slate-700 space-x-2'>
            <span>Credit Balance:</span>
            <span className='font-bold'>{userCredit}</span>
        </div>
        {/* Top-up Credit Balance Button */}
        <Link href="/pricing">
            <Button variant={'outline'}>
                <HiOutlineCreditCard  />
                <span>Top Up Credit</span></Button>
        </Link>
        </div>
        <div className='hidden md:flex'>
        {/* Avatar */}
        <UserAvatar user={session?.user!} />
        </div>
        <div className='md:hidden'>
       <MobileMenu  />
        </div>
    </div>
  )
}

export default Navbar