import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import EducationAndExperience from "@/components/sections/EducationAndExperience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Ambient background glow — purely decorative */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Projects />
        <EducationAndExperience />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
