import { AuthOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'
import { User } from '@prisma/client'

const UserPage = async () => {
  const session = await getServerSession(AuthOptions);
      console.log("Session:", session);
      const userRole = (session?.user as User)?.role;
      console.log("User Role:", userRole);
  return (
    <div>User Page or overview page</div>
  )
}

export default UserPage