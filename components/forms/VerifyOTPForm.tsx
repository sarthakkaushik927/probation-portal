"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AuthCard from "@/components/auth/AuthCard";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";

import { verifyOTP } from "@/actions/auth/verify-otp";
import { resendOTP } from "@/actions/auth/resend-otp";

export default function VerifyOTPForm({
    email,
}: {
    email: string;
}) {
    const router = useRouter();

    const [otp, setOtp] = useState("");
    const [loading, setLoading] =
        useState(false);
    const [cooldown, setCooldown] =
        useState(0);

    const [resending, setResending] =
        useState(false);

    useEffect(() => {
        if (cooldown <= 0) return;

        const timer = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [cooldown]);
    return (
        <AuthCard
            title="Verify Email"
            description={`Enter the OTP sent to ${email}`}
        >
            <div className="space-y-5">

                <FormInput
                    label="OTP"
                    value={otp}
                    onChange={setOtp}
                    placeholder="123456"
                />

                <Button
                    disabled={loading}
                    className="w-full"
                    onClick={async () => {
                        try {
                            setLoading(true);

                            await verifyOTP(
                                email,
                                otp
                            );

                            alert(
                                "Email verified successfully"
                            );

                            router.push(
                                "/auth/login"
                            );

                        } catch (error: any) {
                            alert(
                                error?.message ??
                                "Invalid OTP"
                            );
                        } finally {
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </Button>
                <div className="text-center">

                    <Button
                        variant="ghost"
                        disabled={
                            cooldown > 0 ||
                            resending
                        }
                        onClick={async () => {
                            try {
                                setResending(true);

                                await resendOTP(
                                    email
                                );

                                setCooldown(60);

                                alert(
                                    "OTP sent successfully"
                                );

                            } catch {
                                alert(
                                    "Failed to resend OTP"
                                );
                            } finally {
                                setResending(false);
                            }
                        }}
                    >
                        {cooldown > 0
                            ? `Resend OTP in ${cooldown}s`
                            : resending
                                ? "Sending..."
                                : "Resend OTP"}
                    </Button>

                </div>

            </div>
        </AuthCard>
    );
}