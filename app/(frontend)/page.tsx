import Container from '@/components/layout/container';

import AllActivities from './components/all-activities';
import Destinations from './components/destinations';
import Hero from './components/hero';
import PopularActivities from './components/popular-activities';

export default function Home() {
  return (
    <main>
      <section className="h-screen w-full bg-[url(/home-background.png)] bg-cover bg-center">
        <Container className="space-y-8 pb-20 md:space-y-14">
          <Hero />

          {/* content */}
          <div className="space-y-8 md:space-y-14">
            <PopularActivities />

            <Destinations />

            <AllActivities />
          </div>
        </Container>
      </section>
    </main>
  );
}
