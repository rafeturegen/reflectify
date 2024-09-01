"use client"

import { auth } from '@/app/firebase/config'
import { dashboardLinks } from '@/lib/data'
import { Separator } from '@radix-ui/react-separator'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import React from 'react'
import { RiMentalHealthLine } from 'react-icons/ri'

export default function DashboardHeader() {
  return (
    <header className=''>
        <div className='max-w-5xl mx-auto flex items-center justify-between h-full px-4 xl:px-0 gap-12 mt-3'>
            <div className='flex gap-12'>
                <div className='flex gap-1'>
                    <RiMentalHealthLine className='size-5 text-white'/>
                    <p className='tracking-wider font-bold text-white text-sm'>reflectify</p>
                </div>
                <ul className=' gap-6 hidden md:flex'>
                    {dashboardLinks.map(link => (
                        <li className='text-white font-light text-sm tracking-tight' key={link.link}>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>   
            </div>
            <div className='flex items-center  gap-1'>
                <button className='rounded-[0.35rem] px-4 hover:opacity-80 text-[16px] h-[38px] tracking-tighter text-white' onClick={() =>{signOut(auth)}}>Log out</button>
            </div>              
        </div>
        <Separator className='max-w-5xl mx-auto bg-gray-500 h-[1px] opacity-10 mt-3'/>
    </header>
  )
}
