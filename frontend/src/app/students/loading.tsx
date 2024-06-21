export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <div className="mt-6 w-full max-w-full flex-none px-3">
        <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Students</h2>
              <p className="text-muted-foreground">
                Here is the list of all students!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
