"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AuthCard from "@/components/auth/AuthCard";
import FormInput from "@/components/forms/FormInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { handleSignUp } from "@/actions/auth/signup";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  return (
    <AuthCard
      title="Create Account"
      description="Join the probation portal"
    >
      <div className="space-y-5">
        <FormInput
          label="Full Name"
          value={name}
          onChange={setName}
          placeholder="Sarthak Sharma"
        />

        <FormInput
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="sarthak@gmail.com"
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

      const user = await handleSignUp(
        name,
        email,
        password
      );

      if (user) {
        console.log("user created", user);
        
      }

      alert("Signup Successful");
      
      
    } catch {
      alert("User already Exists");
    } finally {
      setLoading(false);
      router.refresh();
      router.push("/auth/login");
    }
  }}
>
  {loading ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin" />
      Creating Account...
    </>
  ) : (
    "Create Account"
  )}
</Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}