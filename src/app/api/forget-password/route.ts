import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import sgMail from "@sendgrid/mail"

export const POST = async (request: NextRequest) => {
  const { email } = await request.json();
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY

  await connect();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new NextResponse("Email doesn't exist", { status: 400 });
  }

  const resetToken = crypto.randomBytes(20).toString('hex');

  const passwordRestToken = crypto.createHash("sha256").update(resetToken)
    .digest("hex");

  const passwordRestExpires = Date.now() + 3600000;
  existingUser.resetToken = passwordRestToken;

  existingUser.resetTokenExpiry = passwordRestExpires;
  const resetUrl = `localhost:3000/reset-password/${resetToken}`
  console.log(resetUrl);
  const body = "Reset Password by clicking on following url" + " " + resetUrl;

  const msg = {
    to: email,
    from: "rajat.namdev@forgeahead.io",
    subject: "Reset Password",
    text: body
  }
  sgMail.setApiKey(SENDGRID_API_KEY || "");

  sgMail.send(msg).then(() => {
    return new NextResponse("Reset Passwpord email is sent", { status: 200 });
  }).catch(async (error) => {
    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;
    await existingUser.dave();

    return new NextResponse("Failed  sending email, Try Again", {
      status: 400
    });
  });
  try {
    await existingUser.save();
    return new NextResponse("Email is sent for resetting Password", {
      status: 200,
    })
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    })
  }
};
