export default function BlogPostLoading() {
  return (
    <section className="blog-detail-page relative overflow-hidden">
      <div className="container-xl section-padding !pb-16">
        <div className="mb-8 h-10 w-36 animate-pulse rounded-full bg-border" />

        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,13fr)_minmax(240px,7fr)] lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)] lg:gap-12">
          <main className="min-w-0 space-y-8">
            <div className="aspect-[16/10] animate-pulse rounded-3xl bg-border lg:aspect-[21/9]" />
            <div className="space-y-4">
              <div className="h-10 w-full animate-pulse rounded bg-border md:w-4/5" />
              <div className="h-4 w-56 animate-pulse rounded bg-border" />
              <div className="h-28 animate-pulse rounded-2xl bg-border" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-border" />
                <div className="h-4 w-full animate-pulse rounded bg-border" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-border" />
              </div>
            </div>
          </main>

          <aside className="hidden space-y-6 lg:block">
            <div className="h-80 animate-pulse rounded-2xl bg-border" />
            <div className="h-[28rem] animate-pulse rounded-2xl bg-border" />
          </aside>
        </div>
      </div>
    </section>
  );
}
