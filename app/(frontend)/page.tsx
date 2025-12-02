import Container from '@/components/layout/container';

import AllActivities from './components/all-activities';
import Destinations from './components/destinations';
import Hero from './components/hero';
import PopularActivities from './components/popular-activities';

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="relative h-screen w-full bg-[url(/home-background.png)] bg-cover bg-center">
        <Container className="relative z-10 h-full">
          <Hero />
        </Container>
      </section>

      <section className="bg-background w-full py-14">
        <Container className="space-y-14">
          <PopularActivities />

          <Destinations />

          <AllActivities />
        </Container>
      </section>
    </main>
  );
}
