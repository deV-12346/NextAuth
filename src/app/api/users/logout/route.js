import { NextResponse } from "next/server"
import { connectDB } from "@/dbConfig/dbConfig";

connectDB()
export async function GET(){
      try {
            const response = NextResponse.json({
                  success:true,
                  message:"User successfully logout"
            },{status:200})
            response.cookies.set("token","",{
                  httpOnly:true,
                  expires:Date.now()
            })
            return response
      } catch (error) {
            return NextResponse.json({
                  success:false,
                  message:error.message 
            },{status:500})
      }
}