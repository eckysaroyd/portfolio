import { CiLink } from "react-icons/ci";

function Project({ title, category, description, technologies, highlights, link, github, featured }) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-3 group ${
      featured 
        ? 'border-[#00d4ff]/50 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 hover:shadow-2xl hover:shadow-[#00d4ff]/20' 
        : 'border-white/10 hover:border-[#00d4ff]/70 hover:bg-white/10 hover:shadow-lg hover:shadow-[#00d4ff]/10'
    }`}>
      {/* Featured Badge */}
      {featured && (
        <div className="flex justify-between items-center mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/40 rounded-full text-[#00d4ff] text-xs font-semibold">
            Featured Project
          </span>
        </div>
      )}

      {/* Project Category */}
      <div className="mb-3">
        <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
          {category}
        </span>
      </div>
      
      {/* Project Title */}
      <h3 className="font-bold text-xl lg:text-2xl text-white mb-3 group-hover:text-[#00d4ff] transition-colors">
        {title}
      </h3>
      
      {/* Project Description */}
      <p className="leading-relaxed text-white/85 text-sm lg:text-base mb-6">
        {description}
      </p>

      {/* Key Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white/80 mb-3">Key Achievements:</h4>
          <div className="grid grid-cols-2 gap-2">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-white/70">
                <div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full flex-shrink-0"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technologies */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {technologies.split(",").map((tech, index) => (
            <span
              className="inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-white/10 text-white/80 border border-white/20"
              key={index}
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#00d4ff] text-black text-center py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-white transition-all duration-300 hover:shadow-lg group-hover:shadow-[#00d4ff]/20 transform hover:-translate-y-0.5"
        >
          View Live Site
        </a>
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="flex-1 border border-[#00d4ff]/50 text-[#00d4ff] text-center py-2.5 px-4 rounded-lg font-semibold text-sm hover:bg-[#00d4ff] hover:text-black transition-all duration-300 transform hover:-translate-y-0.5"
        >
          View Code
        </a>
      </div>
    </div>
  );
}

export default Project;
