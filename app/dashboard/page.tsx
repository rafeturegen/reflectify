"use client"

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

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
    </main>
  );
}
