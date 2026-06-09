"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import FormInput from "@/components/forms/FormInput";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <AuthCard
      title="Welcome Back"
      description="Login to continue"
    >
      <div className="space-y-5">
        <FormInput
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
        />

        <Button
          disabled={loading}
          className="w-full"
          onClick={async () => {
            try {
              setLoading(true);

              const result = await signIn(
                "credentials",
                {
                  email,
                  password,
                  redirect: false,
                }
              );

              if (result?.error) {
                alert("Invalid Credentials");
                return;
              }

              router.refresh();
              router.replace("/user/dashboard");
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </AuthCard>
  );
}