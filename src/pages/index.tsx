"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export type User = {
  id : number;
  name : string;
  email : string;
  role : number;
  password : string;
}

export default function Home() {

  const [page, setPage] = useState("login");
  const navigate = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate.push("/dashboard");
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-2 h-screen pb-4 md:pb-0  bg-slate-950">
      <div>
        <Image width={800} height={800} className="h-full w-full" src="/images/introduction.jpeg" alt="Next.js Logo" />
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="text-white flex flex-col gap-10">
            <div>
              {
                page === "login" ? <LoginForm /> : <RegisterForm />
              }
            </div>
            <div>
                {
                  page === "login" ? (
                    <p className="text-sm">Don't have an account? <span onClick={() => setPage("register")} className="text-blue-400 cursor-pointer ">Register</span></p>
                  ) : (
                    <p className="text-sm">Already have an account? <span onClick={() => setPage("login")} className="text-blue-400 cursor-pointer">Login</span></p>
                  )
                }
            </div>
        </div>
      </div>
    </div>
  );
}
