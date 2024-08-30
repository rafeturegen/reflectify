import { homeLinks } from '@/lib/data'
import Link from 'next/link'
import React from 'react'
import { RiMentalHealthLine } from 'react-icons/ri'
import { Separator } from './ui/separator'

export default function Header() {
  return (
    <header className=''>
        <div className='max-w-5xl mx-auto flex items-center justify-between h-full px-4 xl:px-0 gap-12 mt-3'>
            <div className='flex gap-12'>
                <div className='flex gap-1'>
                    <RiMentalHealthLine className='size-5'/>
                    <p className='text-black tracking-wider font-bold text-sm'>reflectify</p>
                </div>
                <ul className=' gap-6 hidden md:flex'>
                    {homeLinks.map(link => (
                        <li className='text-black font-light text-sm tracking-tight' key={link.hash}>
                            <Link href={link.hash}>{link.name}</Link>
                        </li>
                    ))}
                </ul>   
            </div>
            <div className='flex items-center  gap-1'>
                <button className='rounded-[0.35rem] px-4 hover:bg-gray-100 text-[16px] h-[38px] tracking-tighter'><Link href="/sign-in">Log in</Link></button>
                <button className='bg-[#22ad01] text-white rounded-[0.35rem] text-xs h-[38px] w-[108px] font-medium tracking-tighter px-3 hover:opacity-90'><Link href="/sign-up">Start free</Link></button>
            </div>              
        </div>
        <Separator className='max-w-5xl mx-auto bg-gray-500 h-[1px] opacity-10 mt-3'/>
    </header>
  )
}
