import { NextResponse } from "next/server"
import { connectDB } from "@/dbConfig/dbConfig";
import  User  from "@/models/user.model";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB()
export async function GET(req){
    try {
      const userId = await getDataFromToken(req)
      const user = await User.findById(userId).select("-password")
      if(!user){
      return NextResponse.json({
            success:false,
            message:"User not found"
            },{status:400})
      }
      return NextResponse.json({
            success:true,
            message:"Profile fetched",
            user
      },{status:200})
    } catch (error) {
      return NextResponse.json({
            success:false,
            message:error.message
      },{status:500})
    }  
}