import user_info from "../../data/user_info.js";
import ContactModal from "../ContactModal.jsx";
import { useState } from "react";

import { FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Let's Work Together
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your next project to life? I'm available for freelance work, consulting, and full-time opportunities.
          </p>
        </div>

        {/* Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Info */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Get In Touch
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Whether you have a project in mind, need technical consultation, or just want to discuss opportunities, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <a
                href={`mailto:${user_info.main.email}`}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/30 transition-colors">
                  <MdEmail className="text-xl text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email Me</h4>
                  <p className="text-[#00d4ff] text-sm">{user_info.main.email}</p>
                </div>
              </a>

              <a
                href={user_info.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/30 transition-colors">
                  <FaLinkedin className="text-xl text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Connect on LinkedIn</h4>
                  <p className="text-white/70 text-sm">Professional networking</p>
                </div>
              </a>

              <a
                href={user_info.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#00d4ff]/20 rounded-lg flex items-center justify-center group-hover:bg-[#00d4ff]/30 transition-colors">
                  <FaLinkedin className="text-xl text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">View My Code</h4>
                  <p className="text-white/70 text-sm">GitHub portfolio</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-[#00d4ff] rounded-full animate-pulse"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Available for Projects
              </h3>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                I'm currently accepting new projects and collaborations. Let's discuss how we can work together to achieve your goals.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="block w-full bg-[#00d4ff] text-black font-semibold py-4 px-6 rounded-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00d4ff]/30"
                >
                  Start a Conversation
                </button>
                
                <p className="text-white/60 text-sm">
                  Typical response time: Within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-white/70 max-w-2xl mx-auto">
            {user_info.contact.note}
          </p>
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

export default Contact;
