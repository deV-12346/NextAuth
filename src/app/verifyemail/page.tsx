"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const page = () => {
  const [isVerified,setVerified] = useState(false)
  const [error,setError] = useState(false)
  const [token,setToken] = useState("")
  const navigation = useRouter()
  const verifyEmail = async()=>{ 
    try {
      await axios.post("/api/users/verify",{token})
      setVerified(true)
    } catch (error:any) {
      setError(true)
      console.log(error.message)
    }
  }
  useEffect(()=>{
    const tokenUrl = window.location.search.split("=")[1]
    setToken(tokenUrl || "")
    console.log(tokenUrl)
    // const {query} = navigation
    // const tokenurl = query.token
    // console.log(tokenurl)
  },[])
  useEffect(()=>{
    if(token.length>0){
    verifyEmail()
    }
  },[token])
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='h-70 w-220 bg-indigo-100 rounded px-10 py-5'>
         <h1 className='text-3xl text-center'>Verify Email</h1>
          <h2  className='text-xl  max-w-[600px] mx-auto bg-red-400 break-words'>{token}</h2>
          {
            isVerified &&
             (<div className=' flex flex-col justify-center items-center'>
              <h1 className='text-3xl'>Email Verified successfully</h1>
              <Link href={"/login"} className='px-4 py-2 bg-indigo-500 rounded-2xl'>Login</Link>
             </div>)
          }
          {
            error && (<div className='mt-5'>
              <h1 className='text-red-500  text-center text-2xl'>Invalid or expired Token</h1>
            </div> )
          }
       </div>
    </div>
  )
}

export default page