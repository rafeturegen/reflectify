"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { auth } from '../firebase/config'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter()

    async function handleSignUp (event:React.FormEvent) {
        event.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(email, password)
            if(res){
                const response = await fetch('/api/createUser', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to create user in the database.');
                }
                setEmail('');
                setPassword('');
                toast.success("Successfully created your account.");
                router.push("/sign-in");
            }
        } catch(e){
            console.error(e)
            toast.error("Couldn't sign up. Please try again.")
        }
    };
  return (
    <main className='h-full flex justify-center items-center'>
        <div className='w-[529px]'>
            <Card className='w-full h-full p-8 rounded-2xl bg-white'>
                <CardHeader className='px-0 pt-0'>
                    <CardTitle className='text-gray-950 font-bold text-2xl text-center'>
                    Sign up to Continue
                    </CardTitle>
                    <CardDescription className='text-gray-500 text-center'>
                    Use your email to continue
                    </CardDescription>
                </CardHeader>
                
                <CardContent className='space-y-5 px-0 pb-0'>
                    <form className='space-y-2.5' onSubmit={handleSignUp}>
                    <Input
                        disabled={false}
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        type='email'
                        placeholder='Email'
                        required
                        className='border border-black/10 hover:border-black rounded-xl text-gray-500'
                    />
                    <Input
                        className='border border-black/10 hover:border-black rounded-xl text-gray-500'
                        disabled={false}
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        type='password'
                        required
                        placeholder='Password'
                    />
                    <Button type='submit' className='hover:bg-black/80 w-full bg-black text-white rounded-xl' size="lg" disabled={false}>
                        Continue
                    </Button>
                    </form>
                    <Separator className='bg-gray-300'/>
                    <p className='text-xs text-muted-foreground text-center'>
                    Already have an account?
                        <Link href="/sign-in" className='ml-1 font-bold'>Sign In</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
        
    </main>
  )
}
