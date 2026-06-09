"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FormSelect from "@/components/forms/FormSelect";
import { Button } from "@/components/ui/button";

import { updateDomain } from "@/actions/user/update-domain";

export default function DomainForm({
  userId,
  currentDomain,
}: {
  userId: string;
  currentDomain: string | null;
}) {
  const router = useRouter();

  const [domain, setDomain] = useState(
    currentDomain ?? "FRONTEND"
  );

  const [loading, setLoading] =
    useState(false);

  return (
    <div className="space-y-5">
      <FormSelect
        label="Domain"
        value={domain}
        onChange={setDomain}
        options={[
          "FRONTEND",
          "BACKEND",
          "CLOUD",
          "AIML",
        ]}
      />

      <Button
        disabled={loading}
        className="w-full"
        onClick={async () => {
          try {
            setLoading(true);

            await updateDomain(
              userId,
              domain
            );

            alert(
              "Domain updated successfully"
            );

            router.refresh();
          } catch (error) {
            if (error instanceof Error) {
              alert(error.message);
            } else {
              alert(
                "Something went wrong"
              );
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {loading
          ? "Saving..."
          : "Save Domain"}
      </Button>
    </div>
  );
}