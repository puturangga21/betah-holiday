import Container from '@/components/layout/container';

export default function Home() {
  return (
    <main>
      <section className="h-screen w-full bg-[url(/home-background.png)] bg-cover bg-center">
        <Container className="space-y-14">
          {/* hero */}
          <div className="flex h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-12 text-center">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-medium text-white uppercase">
                  Discover Your Next
                </span>
                <h1 className="text-9xl font-bold text-white uppercase">
                  ADVENTURE
                </h1>
              </div>
              <span className="max-w-[572px] text-base text-white">
                Experience the magic of exploring the Bali most breathtaking
                destinations with our custom designed travel packages for every
                adventurer.
              </span>
            </div>
          </div>

          {/* content */}
          <div>
            <h1>Most popular activities</h1>
          </div>
        </Container>
      </section>
    </main>
  );
}
