"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import MoodBar from "@/components/dashboard/MoodBar";
import Journal from "@/components/dashboard/Journal";
import { Emotion } from "@/lib/types";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [emotion, setEmotion] = useState<Emotion>('Neutral');
  async function analyseJournal(journal:string){
    try {
      const response = await fetch("/api/analyseJournal",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({journalEntry:journal})
    });
    if(!response.ok){
      throw new Error("Failed to analyze journal.")
    }
    const data = await response.json();
    setEmotion(data.moodAnalysis);
    } catch (error) {
      console.error('Error fetching mood analysis:', error);
    }
    
    
  }

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/sign-in');
      } else {
        setIsCheckingAuth(false);
      }
    }
  }, [user, loading, router]);

  if (loading || isCheckingAuth) {
    return <div>Loading...</div>; 
  }
  console.log({user})

  return (
    <main>
      <DashboardHeader />
      <MoodBar emotion={emotion}/>
      <Journal analyse={analyseJournal}/>

    </main>
  );
}
