"use client"
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, Toaster } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const page = () => {
      const [user, setUser] = useState({
            username: "",
            email: "",
            password: ""
      })
      const [isbuttonDisable, setButtonDisabled] = useState(true)
      const [loading, setLoading] = useState(false)
      const navigation = useRouter()
      const handleChange = (e:any) =>{
           const {name,value} = e.target
           setUser({
            ...user,
            [name]:value
           })
      }
      const handlesignup = async (e:any) => {
            e.preventDefault()
            if(isbuttonDisable) return
            try {
                  setLoading(true)
                  const response = await axios.post("/api/users/signup", user)
                  console.log(user)
                  if (response.data.success) {
                        console.log("success ", response.data.user)
                        navigation.push("/login")    
                  }
            } catch (error:any) {
                  console.log(error.message)
                  toast.error(error?.response?.data?.message)
            }finally{
                  setLoading(false)
            }
      }
      useEffect(()=>{
        if(user.username.length > 0 && user.email.length >0 && user.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
      },[user])
      return (
            <div className='flex justify-center items-center h-screen'>
             <Toaster />
             <div className='h-110 w-110 bg-indigo-100 rounded px-10 py-5 '>
               <h1 className='text-center text-2xl'>{loading ? "Processing" : "Sign up"}</h1>
               <form onSubmit={handlesignup}  >
                  <div className='flex flex-col gap-2 mt-2'>
                  <label className='text-2xl'>Username</label>
                  <input type="text" name="username" value={user.username} className='w-full 
                  rounded px-2 py-2 border-2 border-black' onChange={handleChange}/>
                  </div>

                  <div className='flex flex-col gap-2 mt-2 '>
                  <label className='text-2xl'>Email</label>
                  <input type="email" name="email" value={user.email} className='w-full 
                  rounded px-2 py-2 border-2 border-black' onChange={handleChange}/>
                  </div>

                  <div className='flex flex-col gap-2 my-2'>
                  <label className='text-2xl'>Password</label>
                  <input type="password" name="password" value={user.password} className='w-full 
                  rounded px-2 py-2 border-2 border-black' onChange={handleChange} />
                  </div>
                   
                   {
                        loading ?
                        <button className='px-10 py-2 bg-indigo-500 hover:bg-indigo-200 
                        cursor-pointer rounded'>Please wait</button>
                        :
                        <button type='submit' className='px-10 py-2 bg-indigo-500 hover:bg-indigo-200
                        cursor-pointer rounded'>
                        {isbuttonDisable ? "No Sign up" :"Sign up"} 
                        </button>
                   }
               </form>
               <div className='mt-5'>
                  <Link href={"/login"} className='hover:underline text-blue-600 text-left'>Already registered ? </Link>
               </div>
             </div>
            </div>
      )
}

export default page