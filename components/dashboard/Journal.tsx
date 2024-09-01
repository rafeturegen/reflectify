"use client"

import React, { useState } from 'react'
import { Textarea } from '../ui/textarea';

interface JournalProps {
    analyse: (journal:string) => void;
  }

export default function Journal({analyse}: JournalProps) {

  const [journal, setJournal] = useState<string>("");
  return (
    <section className='max-w-5xl mx-auto'>
      <div className='flex flex-col items-center gap-2'>
        
        <div className='w-[529px]'>
          <Textarea className='border border-gray-200 rounded-xl hover:border-2 text-white' value={journal} onChange={(e) => {setJournal(e.target.value)}} />
        </div>
        <button onClick={() => {analyse(journal)}} className='text-white px-3 py-1 rounded-[0.35rem] hover:border hover:border-amber-300'>Click to analyse</button>
      </div>
      
    </section>
  )
}
