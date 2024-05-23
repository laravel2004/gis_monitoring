import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  try{
    const authHeader = req.headers.authorization;
    const bearer = authHeader?.split("Bearer ")[1];
    const decode = jwt.verify(bearer!, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) {
        return null;
      }
      return decoded;
    });
    const user = await prisma.user.findUnique({
      where: {
        id: decode?.["id"]
      }
    })

    return res.status(200).json({ status: "success", message: {
      id : user?.id,
      email : user?.email,
      name : user?.name,
      role : user?.role
    } });

  }
  catch(err){
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}