export default function Loading() {
  return (
    <div className="mx-auto mt-10 max-w-5xl px-6 lg:px-8">
      <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-1 border-border bg-card bg-clip-border p-10">
        <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Coaches</h2>
              <p className="text-muted-foreground">
                Here is the list of all coaches!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
