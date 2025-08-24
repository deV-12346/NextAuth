import { NextResponse } from "next/server"
import { connectDB } from "@/dbConfig/dbConfig";
import  User  from "@/models/user.model";
import { sendEmail } from "@/utils/mailer";
import bcrypt from "bcryptjs"

connectDB()
export async function GET() {
      return NextResponse.json({message:"Hello from routes"})
}
export async function POST(req) {
      try {
            const reqBody = await req.json()
            console.log(reqBody)
            const {username,email,password} = reqBody
            const user = await User.findOne({email:email})
            if(user){
                  return NextResponse.json({
                        message:"User already exists"
                  },{status:400})
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User({
                  username,
                  email,
                  password:hashedPassword,

            })
            const saveUser = await newUser.save()
            await sendEmail({
                  email,
                  emailType: "VERIFY",
                  userId: saveUser._id,
            });
            return NextResponse.json({
                  success:true,
                  message:"User registered sucessfully",
                  user:saveUser
            },{status:201}) 
      } catch (error) {
            return NextResponse.json({
                  success:false,
                  message: error.message
            }, {status:500} )
      }
}