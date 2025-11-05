import React, { Children } from 'react'
import MainSideBar from '../_components/MainSideBar'

const UserLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full'>
        {/* Navbar and Sidebar */}
        <div className='bg-gray-200 h-[50px] w-full md:pl-56 fixed inset-y-0 z-50'>
            <h1>Navbar</h1>
        </div>
        <div className='hidden md:flex flex-col h-full w-48 bg-gray-100 fixed inset-y-0 z-50'>
            <MainSideBar />
        </div>
        <main>
            {children}
        </main>
    </div>
  )
}

export default UserLayout