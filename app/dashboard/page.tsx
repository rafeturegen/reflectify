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
  const [journal, setJournal] = useState<string>("");
  const [emotion, setEmotion] = useState<Emotion>('Neutral');

  useEffect(() => {
    async function fetchTodayJournal(){
      if(user){
        const today = new Date();
        try {
          const response = await fetch("/api/getJournal", {
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({email:user?.email, dateComing:today.toISOString() })
          })
          
          if(response.ok){
            const data = await response.json();
            console.log(data.journal)
            setJournal(data.journal)
          }
        } catch (error) {
          console.error("Fetching error:", error);
          return;
        }
      }
    }
    fetchTodayJournal();
  }, [user])

  async function handleJournalSubmit (event:React.FormEvent){
    event.preventDefault()
    try {
      const response = await fetch("/api/analyseJournal", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ journalEntry:journal, email:user?.email })
      })

      if(!response.ok){
        console.log("Failed to analyze the journal")
        return;
      }

      const data = await response.json();

      if(data.moodAnalysis){
        setEmotion(data.moodAnalysis);
      }

    } catch (error) {
      console.error("Error:", error)
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

  return (
    <main>
      <DashboardHeader />
      <MoodBar emotion={emotion}/>
      <Journal 
        journal={journal} 
        setJournal={setJournal} 
        onSubmit={handleJournalSubmit} 
      />
    </main>
  );
}
