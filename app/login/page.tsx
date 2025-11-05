"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { signIn, useSession } from "next-auth/react";
const LoginPage = () => {
  const session = useSession();
  console.log(session)
  return (
    <div className="flex h-screen justify-center items-center">
      <Card  className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login with your google account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Button onClick={() => signIn('google', {callbackUrl:'/'})} variant="outline" className="flex " ><FcGoogle className="w-6 h-6" /><span>Continue with Google</span></Button>
                <Button onClick={() => signIn('github', {callbackUrl:'/'})} variant="outline" className="flex " ><IoLogoGithub  className="w-6 h-6" /><span>Continue with Github</span></Button>
                <Button onClick={() => signIn('facebook', {callbackUrl:'/'})} variant="outline" className="flex " ><BsFacebook   className="w-6 h-6" /><span>Continue with Facebook</span></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
