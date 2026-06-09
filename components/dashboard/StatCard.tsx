interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-3xl border p-6">
      <h3 className="text-sm text-muted-foreground">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}