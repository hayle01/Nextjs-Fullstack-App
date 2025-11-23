"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa6";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("If an account exists, a reset code has been sent.");
      router.push(`/auth/reset-password/verify?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md md:max-w-sm lg:max-w-[450px] mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg border border-border">
      <div className="mb-2 flex items-center justify-center">
        <Link
          href="/auth/signin"
          className="hover:text-gray-600 text-sm transition-all flex items-center gap-2">
          <FaArrowLeft size={13} />
          Back to Login
        </Link>
      </div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          Reset Password
        </h2>
        <p className="text-gray-500 text-sm dark:text-gray-400 mt-2">
          Enter your email address and we&apos;ll send you a code to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Button type="submit" size={"lg"} className="w-full" disabled={loading}>
          {loading ? "Sending code..." : "Send Reset Code"}
        </Button>
      </form>
    </div>
  );
}
