import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import MainSideBar from './MainSideBar'
import { Menu } from 'lucide-react'
const MobileMenu = () => {
  return (
    <div>
        <Sheet>
  <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition-all'><Menu /></SheetTrigger>
  <SheetContent side={"left"} className='p-0'>
   <MainSideBar />
  </SheetContent>
</Sheet>
    </div>
  )
}

export default MobileMenu