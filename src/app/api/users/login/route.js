import { NextResponse } from "next/server"
import { connectDB } from "@/dbConfig/dbConfig";
import  User  from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
connectDB()
export async function POST(req){
      try {
          const {email,password} = await req.json()  
          const user = await User.findOne({email})
          if(!email){
            return NextResponse.json({
                  success:false,
                  message:"Invalid Email"
            },{status:400})
          }
          const verifiedPassword = await bcrypt.compare(password,user.password)
          if(!verifiedPassword){
            return NextResponse.json({
                  success:false,
                  message:"Invalid Password"
            },{status:400})
          }
          const payload = {
            id:user._id,
            username:user.username,
            email:user.email,
          }
         const loggedInUser = await User.findById(user._id).select("-password")
         const token =  await jwt.sign(payload,process.env.TOKENSECRET,{expiresIn:"1d"})
         const response = NextResponse.json({
            success:true,
            message:"User successfully login",
            loggedInUser
         },{status:200})
         response.cookies.set("token",token,{httpOnly:true})
         return response
      } catch (error) {
            return NextResponse.json({
                  success:false,
                  message:error.message
            },{status:500})
      }
}