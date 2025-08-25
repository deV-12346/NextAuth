import  User  from "@/models/user.model"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
export const sendEmail = async ({email,emailType,userId}) =>{
      try {
            const plainToken = userId.toString()
            const hashedToken = await bcrypt.hash(plainToken,10)
            const verifyEmail = `<p>
                  Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to verify your email 
                   or copy or paste the link below in the browser  <br>
                   ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                  </p>` 
             const resetPassword = `<p>
                  Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to reset your password 
                   or copy or paste the link below in the browser  <br>
                   ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                  </p>` 
            if(emailType === "VERIFY"){
                  await User.findByIdAndUpdate(userId,{$set:{
                  verifyToken:hashedToken,
                  verifyTokenExpiry:Date.now()+3600000
            }
            })
            }else if (emailType === "RESET"){
                  await User.findByIdAndUpdate(userId,{
                  $set:{
                  forgotPasswordToken:hashedToken,
                  forgotPasswordTokenExpiry:Date.now()+3600000
                  }
            })
            }
           const transporter = nodemailer.createTransport({
                  host:"sandbox.smtp.mailtrap.io",
                  port:2525,
                  auth:{
                        user:process.env.USER,
                        pass:process.env.PASSWORD
                  }
           })
           const mailOption = {
                  from:"dr395108@gmail.com",
                  to:email,
                  subject:emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                  html: emailType==="VERIFY" ? verifyEmail : resetPassword 
            } 
            const mailResponse = await transporter.sendMail(mailOption)
            console.log(mailResponse)
            return mailResponse
      } catch (error) {
            throw new Error(error.message)
      }
}