import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 flex flex-col items-center w-full">
        <Hero />
        <About />
        <Projects />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
