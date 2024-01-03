import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";


export const POST = async (request: NextRequest) => {
  const { token } = await request.json();
  

  await connect();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user =await User.findOne({
    resetToken:hashedToken,
    resetTokenExpiry:{$gt:Date.now()}
  })
  if(!user){
    return new NextResponse("Invalid token or token has expired",{status:400})
  }
  return new NextResponse(JSON.stringify(user),{status:200})
 };
