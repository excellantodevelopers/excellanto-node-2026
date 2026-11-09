export default function BlogLoading() {
  return (
    <>
      <div className="animate-pulse border-b border-border bg-white">
        <div className="container-xl py-16 md:py-20">
          <div className="h-3 w-24 rounded bg-border" />
          <div className="mt-4 h-10 max-w-xl rounded bg-border md:h-12" />
        </div>
      </div>
      <section className="section-padding bg-surface">
        <div className="container-xl space-y-12">
          <div className="animate-pulse overflow-hidden border border-border bg-white">
            <div className="aspect-[16/9] bg-border md:aspect-[21/9]" />
            <div className="border-t border-border px-6 py-4 md:px-8">
              <div className="h-4 w-32 rounded bg-border" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden border border-border bg-white"
              >
                <div className="aspect-[16/10] bg-border" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 rounded bg-border" />
                  <div className="h-6 w-full rounded bg-border" />
                  <div className="h-4 w-full rounded bg-border" />
                  <div className="h-4 w-4/5 rounded bg-border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
