import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method !== "POST"){
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }
  const { name, email, password } = req.body;
  try{
    if(!name || !email || !password){
      return res.status(400).json({ status: "error", message: "Missing name, email or password" });
    }
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name : name,
        email : email,
        password: hashedPassword,
        role : true
      }
    });
    return res.status(200).json({ status: "success", message: jwt.sign({ id: user.id }, process.env.JWT_SECRET!) });
  }
  catch(err){
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}