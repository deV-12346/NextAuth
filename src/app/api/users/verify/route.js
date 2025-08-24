import { NextResponse } from "next/server"
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";

connectDB()
export async function POST(req) {
      try {
            const reqBody = await req.json()
            const { token } = reqBody
            const user = await User.findOne({
                  verifyToken: token,
                  verifyTokenExpiry: { $gt: Date.now() }
            })
            if (!user) {
                  return NextResponse.json({
                        success: false,
                        message: "Invalid Token",
                  },{status:400})
            }

            console.log(user)
            user.isVerified = true
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined
            await user.save()

            return NextResponse.json({
                  success: true,
                  message: "Email successfully verified"
            },{status:200})
      }catch (error) {
            return NextResponse.json({
                  success: false,
                  message: error.message
            }, { status: 500 })
      }
}