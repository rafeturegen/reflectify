"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await signInWithEmailAndPassword(email, password);
    
    if (res) {
      console.log('Sign-in successful:', res);
      sessionStorage.setItem('user', "true");
      setEmail('');
      setPassword('');
      toast.success("Redirecting...")
      setTimeout(() => {},1000)
      router.push('/dashboard');
    } else {
      toast.error("Couldn't sign in. Please try again.")
      console.error('Sign-in failed:', error);
    }
  };
  return (
    <main className='h-full flex justify-center items-center'>
      <div className='w-[529px]'>
        <Card className='w-full h-full p-8 rounded-2xl bg-white'>
          <CardHeader className='px-0 pt-0'>
            <CardTitle className='text-gray-950 font-bold text-2xl text-center'>
              Log in to Continue
            </CardTitle>
            <CardDescription className='text-gray-500 text-center'>
              Use your email to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className='space-y-5 px-0 pb-0'>
            <form className='space-y-2.5' onSubmit={handleSignIn}>
              <Input
                disabled={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
                required
                className='border border-black/10 hover:border-black rounded-xl text-gray-500'
              />
              <Input
                className='border border-black/10 hover:border-black rounded-xl text-gray-500'
                disabled={false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                required
                placeholder='Password'
              />
              <Button type='submit' className='hover:bg-black/80 w-full bg-black text-white rounded-xl' size="lg" disabled={false}>
                {loading ? 'Signing In...' : 'Continue'}
              </Button>
            </form>
            <Separator className='bg-gray-300'/>
            <p className='text-xs text-muted-foreground text-center'>
              Don&apos;t have an account?
              <Link href="/sign-up" className='font-bold ml-1'>Sign Up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
    
  )
}
