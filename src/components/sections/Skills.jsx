import { FaFigma } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaDocker, FaAws, FaGitAlt, FaReact, FaVuejs, FaNodeJs } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { IoLogoFirebase } from "react-icons/io5";
import { MdBugReport } from "react-icons/md";
import { SiExpress, SiLaravel, SiTailwindcss, SiBootstrap, SiTypescript, SiMysql, SiMongodb, SiCodeigniter, SiNextdotjs, SiSupabase, SiGitlab, SiLinux, SiPhp } from "react-icons/si";

function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: <FaReact className="text-2xl" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-2xl" /> },
        { name: "Vue.js", icon: <FaVuejs className="text-2xl" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-2xl" /> },
        { name: "Bootstrap", icon: <SiBootstrap className="text-2xl" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="text-2xl" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-2xl" /> }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-2xl" /> },
        { name: "Express.js", icon: <SiExpress className="text-2xl" /> },
        { name: "Laravel", icon: <SiLaravel className="text-2xl" /> },
        { name: "PHP", icon: <SiPhp className="text-2xl" /> },
        { name: "CodeIgniter", icon: <SiCodeigniter className="text-2xl" /> }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: <SiMysql className="text-2xl" /> },
        { name: "PostgreSQL", icon: <BiLogoPostgresql className="text-2xl" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-2xl" /> },
        { name: "Supabase", icon: <SiSupabase className="text-2xl" /> }
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Docker", icon: <FaDocker className="text-2xl" /> },
        { name: "AWS", icon: <FaAws className="text-2xl" /> },
        { name: "Firebase", icon: <IoLogoFirebase className="text-2xl" /> },
        { name: "Git", icon: <FaGitAlt className="text-2xl" /> },
        { name: "GitLab", icon: <SiGitlab className="text-2xl" /> },
        { name: "Linux", icon: <SiLinux className="text-2xl" /> }
      ]
    },
    {
      title: "Design & Testing",
      skills: [
        { name: "Figma", icon: <FaFigma className="text-2xl" /> },
        { name: "Playwright", icon: <MdBugReport className="text-2xl" /> }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Technical Expertise
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Mastering the full development stack with 6+ years of hands-on experience in building scalable, high-performance applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-[#00d4ff]/50 transition-all duration-300 group">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {category.title}
                </h3>
                <div className="w-12 h-1 bg-[#00d4ff] rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className="flex items-center gap-3 py-3 px-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all duration-300 group/skill"
                  >
                    <div className="text-[#00d4ff] group-hover/skill:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-medium text-white/90 group-hover/skill:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Highlights */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            What Sets Me Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-[#00d4ff] rounded-full"></div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Full-Stack Mastery</h4>
              <p className="text-white/70 text-sm">
                End-to-end development expertise from database design to user interface implementation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-[#00d4ff] rounded-full"></div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Modern Architecture</h4>
              <p className="text-white/70 text-sm">
                Building scalable, maintainable applications using industry best practices and patterns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00d4ff]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-[#00d4ff] rounded-full"></div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Performance Focus</h4>
              <p className="text-white/70 text-sm">
                Optimizing applications for speed, efficiency, and exceptional user experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;