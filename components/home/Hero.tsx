import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <section className='max-w-5xl mx-auto h-[400px] flex justify-center mt-8 md:mt-10'>
        <div className='space-y-6'>
            <div className='flex justify-center'>
            {[...Array(5)].map((_, index) => (
                <StarIcon
                key={index}
                className="h-4 w-4  fill-primary"
                />
            ))}  
            </div>
            <div>
                <h1 className='text-7xl font-bold font-roboto text-center md:w-[729px] mx-auto text-white'>Your Path to Mental Clarity</h1>
                <p className='text-gray-400 text-center md:w-[800px] mx-auto my-5'>Track your mood, reflect on your thoughts, and gain personalized insights with Reflectify, your AI-powered mental wellness journal.</p>
                <div className='flex justify-center gap-4'>
                    <button className='px-5 py-2 border border-black rounded-[0.35rem] text-sm tracking-tighter hover:text-amber-300 hover:border-amber-300 text-white'><Link href="#features">Learn More</Link></button>
                    <button className='px-5 py-2 bg-amber-300 text-white rounded-[0.35rem] text-sm tracking-tighter hover:opacity-90'><Link href="/sign-up">Get Started</Link></button>                 
                </div>
            </div>
        </div>
    </section>
  )
}

function StarIcon (props:any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    )
}