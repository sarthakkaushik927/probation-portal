"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import AuthCard from "@/components/auth/AuthCard";
import FormInput from "@/components/forms/FormInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

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

              const result =
                await signIn(
                  "credentials",
                  {
                    email,
                    password,
                    redirect: false,
                  }
                );

              if (result?.error) {
                if (result.error.includes("verify")) {
                  alert("Please verify your email first.");
                } else {
                  alert("Invalid credentials.");
                }
                return;
              }

              // Fetch session to check role
              const res = await fetch("/api/auth/session");
              const session = await res.json();
              
              if (session?.user?.role === "ADMIN") {
                window.location.href = "/admin/dashboard";
              } else {
                window.location.href = "/user/dashboard";
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </Button>

      </div>
    </AuthCard>
  );
}