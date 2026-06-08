interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}