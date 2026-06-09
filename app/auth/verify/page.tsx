import VerifyOTPForm from "@/components/forms/VerifyOTPForm";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
  }>;
}) {
  const { email } =
    await searchParams;

  return (
    <main className="flex min-h-[90vh] items-center justify-center px-4">
      <VerifyOTPForm
        email={email ?? ""}
      />
    </main>
  );
}