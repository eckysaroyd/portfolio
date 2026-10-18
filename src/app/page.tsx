import { getPortfolioMeta, getProjects, getSkills } from "@/lib/portfolio-data";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import EducationAndExperience from "@/components/sections/EducationAndExperience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default async function HomePage() {
  const [meta, projects, skills] = await Promise.all([
    getPortfolioMeta(),
    getProjects(),
    getSkills(),
  ]);

  return (
    <main className="min-h-screen bg-background pt-14 sm:pt-16 md:pt-20">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Projects projects={projects} />
        <EducationAndExperience />
        <Skills skills={skills} />
        <Contact
          email={meta.email}
          location={meta.location}
          availability={meta.availability}
          linkedin={meta.linkedin}
          github={meta.github}
          contactDescription={meta.contact_description}
          contactNote={meta.contact_note}
        />
        <Footer />
      </div>
    </main>
  );
}
