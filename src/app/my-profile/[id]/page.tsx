import React from 'react'

const MyDeatils = ({ params }: { params: { id: string } }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-5 '>
       <h1>My Profile</h1>
       <h1>{params.id}</h1>
    </div>
  )
}

export default MyDeatils