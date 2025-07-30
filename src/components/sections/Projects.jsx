import user_info from "../../data/user_info.js";
import Project from "../Project.jsx";
import ContactModal from "../ContactModal.jsx";
import { useState } from "react";

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredProjects = user_info.projects.filter(project => project.featured);
  const otherProjects = user_info.projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Featured Projects
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Delivering enterprise-grade solutions that drive business growth and exceptional user experiences across diverse industries
          </p>
        </div>
        
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <Project
                  key={`featured-${index}`}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  technologies={project.technologies}
                  highlights={project.highlights}
                  github={project.github}
                  link={project.link}
                  featured={project.featured}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Additional Projects
              </h3>
              <p className="text-white/70">
                More examples of my work across different domains and technologies
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((project, index) => (
                <Project
                  key={`other-${index}`}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  technologies={project.technologies}
                  highlights={project.highlights}
                  github={project.github}
                  link={project.link}
                  featured={project.featured}
                />
              ))}
            </div>
          </>
        )}

        {/* Professional CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-white/80 mb-6">
              Let's discuss how I can help bring your vision to life with cutting-edge technology and proven expertise.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-8 py-3 bg-[#00d4ff] text-black font-semibold rounded-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00d4ff]/30"
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}

export default Projects;
