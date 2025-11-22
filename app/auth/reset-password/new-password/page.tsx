"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"; 
import { GoLock } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function NewPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
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
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/reset/new-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword: password }),
            });

            const data = await res.json();
            
            if (!res.ok) {
                toast.error(data.message || "Failed to update password.");
                throw new Error(data.message || "Failed to update password.");
            }
            toast.success("Password updated successfully! Please sign in."); 
            router.push("/auth/signin");
            
        } catch (err: any) {
            toast.error(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md md:max-w-sm lg:max-w-[450px] mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg border border-border">
            
            <div className="mb-8 flex items-center justify-center">
                <Link
                    href="/auth/signin"
                    className="text-sm transition-all flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <FaArrowLeft size={13} />
                    Back to login
                </Link>
            </div>
            
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold tracking-tight">
                    Reset Password
                </h2>
                <p className="text-gray-500 text-sm dark:text-gray-400 mt-2">
                    Enter your new password below
                </p>
                
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <div className="relative">
                            <GoLock  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-800" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="pl-10"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FiEyeOff  className="h-4 w-4" /> : <FiEye  className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                            <GoLock  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-800" />
                            <Input
                                id="confirm-password"
                                name="confirm-password"
                                type={showPassword ? "text" : "password"}
                                required
                                className="pl-10"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FiEyeOff  className="h-4 w-4" /> : <FiEye  className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="text-red-500 text-sm text-center">{error}</div>
                )}

                <div>
                    <Button
                        type="submit"
                        disabled={loading}
                        size={"lg"}
                        className="w-full flex items-center justify-center gap-2" 
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                        <FaArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
}