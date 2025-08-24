import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
export const getDataFromToken = async(req)=>{
      try {
            const token = req.cookies.get("token")?.value || ""
            if(!token){
                  NextResponse.json({
                        success:false,
                        message:"Token not found"
                  },{status:401})
            }
            const decodedToken = await jwt.verify(token ,process.env.TOKENSECRET)
            console.log( decodedToken?.id)
            return decodedToken?.id
      } catch (error) {
            return NextResponse.json({
                  success:false,
                  message:error.message
            },{status:500})
      }
}