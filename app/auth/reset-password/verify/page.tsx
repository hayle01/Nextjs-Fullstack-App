"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function VerifyResetCodePage() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    

    useEffect(() => {
        if (!email) {
            router.push("/auth/reset-password"); 
        }
    }, [email, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = code;
        if (token.length !== 6) {
            toast.error("Please enter the complete 6-digit code.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/reset/verify", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token }), 
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid or expired code."); 
            }

            toast.success("Code verified successfully!");
           router.push(`/auth/reset-password/new-password?email=${encodeURIComponent(email!)}`);
            
        } catch (error: any) {
            toast.error(error.message || "An unexpected error occurred.");
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
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold tracking-tight">
                    Enter Verification Code
                </h2>
                <p className="text-gray-500 text-sm dark:text-gray-400 mt-2">
                    We&apos;ve sent a code to{" "}
                    <span className="font-semibold">{email}</span>.
                </p>
            </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(value) => setCode(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            disabled={loading || code.length !== 6} 
                            size={"lg"}
                            className="w-full"
                        >
                            {loading ? "Verifying..." : "Verify Code"}
                            <FaArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
        </div>
    );
}