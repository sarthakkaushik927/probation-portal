export default function Loading() {
  return (
    <main className="p-8">
      <div className="animate-pulse space-y-6">

        <div className="h-10 w-64 rounded bg-muted" />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="h-32 rounded-3xl bg-muted" />
          <div className="h-32 rounded-3xl bg-muted" />
          <div className="h-32 rounded-3xl bg-muted" />
        </div>

      </div>
    </main>
  );
}