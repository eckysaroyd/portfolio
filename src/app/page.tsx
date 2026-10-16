import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import EducationAndExperience from "@/components/sections/EducationAndExperience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
