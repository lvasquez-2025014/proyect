export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Luxury Enterprises</h1>
      <p className="text-lg text-muted-foreground">Enterprise resource planning for luxury brands</p>
      <a
        href="/api/health"
        className="mt-4 rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
      >
        Health Check
      </a>
    </main>
  );
}
