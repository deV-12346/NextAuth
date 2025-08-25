import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
export const getDataFromToken = async(req)=>{
      try {
            const token = req.cookies.get("token")?.value || ""
            if(!token){
                 throw new Error("Token not found")
            }
            const decodedToken = await jwt.verify(token ,process.env.TOKENSECRET)
            console.log( decodedToken?.id)
            return decodedToken?.id
      } catch (error) {
            throw new Error(error.message)
      }
}