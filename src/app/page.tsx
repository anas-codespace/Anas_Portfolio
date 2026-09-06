
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Startup from "@/components/Startup";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <div className="grain" />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Startup />
      <Contact />
    </main>
  );
}
