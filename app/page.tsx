import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Coordinators } from '@/components/Coordinators';
import { Activities } from '@/components/Activities';
import { Directory } from '@/components/Directory';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Coordinators />
        <Activities />
        <Directory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
