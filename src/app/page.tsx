import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <Hero />
      <About />
      <Projects />
      <ContactSection />
    </main>
  );
}
