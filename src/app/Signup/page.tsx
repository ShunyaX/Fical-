'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { set } from 'mongoose';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  
  const handlesubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/signup', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

    const data = await res.json();
    if (res.ok) { 
      console.log("User created:", data);
      setEmail('');
      setPassword('');
      setDone(true);
      setTimeout(() => {
        router.push('/Login');
      }, 2000);
    } else {
      console.error("Signup error:", data.error);
      setError(data.error || 'Signup failed');
    }
  }
  const router = useRouter();
  return (
    <div>

        <div className='flex flex-col items-center justify-center h-screen font-pop  '>
            <h1 className='text-white text-3xl hover:text-red-500'>Sign Up</h1>
            {!done && (
            <form onSubmit={handlesubmit} className='text-white w-96 mt-16 flex flex-col space-y-8 bg-transparent'>
                <div className='text-base flex flex-col gap-3'>
                    <label >Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}  className=' focus:border-red-500 text-xl p-2 border-b-2 bg-transparent outline-none w-full' required />
                    <label>Password:</label>
                    <input type="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} className=' focus:border-red-500 text-xl p-2 border-b-2 borderx bg-transparent outline-none w-full' required />
                </div>
                <div className='text-white flex items-center justify-center gap-2'>
                  <button type="button">Already have a account?</button>
                  <button type="button" className='text-red-500' onClick={()=> {router.push('Login')}}>Login</button>
                </div>
                <button type="submit" className=' border-2 border-red-500 focus:border-red-500fset-2 rounded-full bg-red-800 hover:bg-red-700 '>Next</button>
                {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
                </form>
                )}

                { done && (
                  <>
                    <Image src="/success.png" alt="Success" width={100} height={100} className='w-24 h-24 mt-10' />
                    <p className='text-white'>Signup successful! You can now log in.</p>
                  </>
                )}
        </div>
    </div>
  )
}
