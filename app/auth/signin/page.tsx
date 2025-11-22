"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md md:max-w-sm lg:max-w-[450px] mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg border border-border">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold tracking-tight"> Welcome back!</h2>
        <p className="text-gray-500 text-sm dark:text-gray-400 mt-2">
          Enter your credentials to sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/reset-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>
       
          <Button type="submit" size={"lg"} className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
  
      </form>

      
      <div className="flex items-center gap-2 mt-6">
        <div className="h-[1px] w-[33%] bg-border" /> <span className="text-sm text-gray-600 ">Or continue with</span> <div className="h-[1px] w-[33%] bg-border" />
      </div>

      <div className="grid w-full items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <Button onClick={() => signIn('google', { callbackUrl: '/' })} size={"lg"} variant="outline" className="flex items-center w-full" >
            <FcGoogle className="w-12 h-12" /><span>Google</span>
            </Button>
          <Button onClick={() => signIn('github', { callbackUrl: '/' })} size={"lg"} variant="outline" className="flex items-center w-full" ><IoLogoGithub /><span>Github</span></Button>

        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
