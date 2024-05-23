import {PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method !== "POST"){
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }
  const { email, password } = req.body;
  try{
    if(!email || !password){
      return res.status(400).json({ status: "error", message: "Missing email or password" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if(!user){
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const isPasswordvalid = await compare(password, user.password);
    if(!isPasswordvalid){
      return res.status(401).json({ status: "error", message: "Invalid email or password" });
    }
    return res.status(200).json({ status: "success", message: jwt.sign({ id: user.id }, process.env.JWT_SECRET!) });
  }
  catch(err){
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}