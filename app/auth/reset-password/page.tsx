"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/auth/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Password reset successfully!");
      router.push("/auth/signin");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md md:max-w-sm lg:max-w-[450px] mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg border border-border">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">Reset Password</h2>
        <p className="text-gray-500 text-sm dark:text-gray-400 mt-2">
          Enter the code sent to <span className="font-medium text-gray-600">{email}</span> and your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 text-center text-2xl tracking-widest"
            maxLength={6}
          />
        </div>

        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Resetting password..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
