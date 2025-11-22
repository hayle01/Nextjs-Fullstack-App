"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IoLogoGithub } from "react-icons/io";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Account created! Please check your email for the verification code.");
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-border">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Create an account</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Get started with our platform today.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>

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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full" size={"lg"} disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
      <div className="flex items-center gap-2 mt-6">
              <div className="h-[1px] w-[33%] bg-border" /> <span className="text-sm text-gray-600 ">Or continue with</span> <div className="h-[1px] w-[33%] bg-border" />
            </div>
      
            <div className="grid w-full items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Button onClick={() => signIn('google', { callbackUrl: '/' })} size={"lg"} variant="outline" className="flex items-center w-full" ><FcGoogle className="w-6 h-6" /><span>Google</span></Button>
                <Button onClick={() => signIn('github', { callbackUrl: '/' })} size={"lg"} variant="outline" className="flex items-center w-full" ><IoLogoGithub className="w-6 h-6" /><span>Github</span></Button>
      
              </div>
            </div>
      

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
