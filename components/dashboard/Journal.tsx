"use client"

import React, { useState } from 'react'
import { Textarea } from '../ui/textarea';

interface JournalProps{
  journal:string,
  setJournal:(value:string) => void,
  onSubmit:(event:React.FormEvent) => void,
}


export default function Journal({ journal, onSubmit, setJournal } : JournalProps) {
  return (
    <section className='max-w-5xl mx-auto'>
      <div className='flex flex-col items-center gap-2'>
        <h2 className='text-white text-lg tracking-tight'>Today's Journal</h2>
        <form onSubmit={onSubmit} className='flex flex-col justify-center gap-1'>
          <Textarea placeholder='Start writing your thoughts' className='border border-gray-200 rounded-xl hover:border-2 text-white w-[361px] md:w-[529px] min-h-64' value={journal} onChange={(e) => {setJournal(e.target.value)}} />
          <button type='submit' className='text-white px-3 py-1 rounded-[0.35rem] hover:border hover:border-gray-200'>Click to analyse</button>
        </form>
      </div>
    </section>
  )
}
