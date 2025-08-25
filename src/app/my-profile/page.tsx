"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {  useState } from 'react'
import toast from 'react-hot-toast'

const MyProfile = () => {
  const [data,setData] = useState(null)
  const router = useRouter()
  const fetchData = async() =>{
    try {
      const response = await axios.get("/api/users/my-profile")
      setData(response.data.user._id)
      console.log("success")
    } catch (error:any) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
    }
  }
  const logout = async() =>{
    try {
      const response = await axios.get("/api/users/logout")
      toast.success(response.data.message)
      router.push("/login")
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center gap-5'>
      <h1>My Profile</h1>
      <h1>{
      data ===null ? "nothing to display" : 
      <Link href={`/my-profile/${data}`}>
      {data}
      </Link> }
      </h1>
      <button onClick={logout} className='px-6 py-2 rounded bg-green-300 hover:bg-green-600'>Logout</button>
      <button onClick={fetchData} className='px-6 py-2 rounded bg-blue-300 hover:bg-blue-600'>Get my Details</button>
    </div>
  )
}

export default MyProfile