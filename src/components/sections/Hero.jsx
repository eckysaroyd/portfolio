import user_info from "../../data/user_info.js";
import { IoIosArrowForward } from "react-icons/io";

function Hero() {
  return (
    <section id="hero" className="pb-32 pt-24 sm:pt-28 md:pt-44 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Professional Badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] text-sm font-medium backdrop-blur-sm">
            <div className="w-2 h-2 bg-[#00d4ff] rounded-full mr-2 animate-pulse"></div>
            Available for new opportunities
          </div>
        </div>

        <div className="text-center lg:text-left">
          {/* Mobile Profile Image */}
          <div className="mb-8 lg:hidden">
            <img
              src={user_info.main.photo}
              className="rounded-full w-32 h-32 mx-auto border-4 border-white/20 shadow-xl"
              alt="Eckysaroyd Nyato - Full Stack Developer"
            />
          </div>
          
          {/* Main Content */}
          <div className="text-white">
            {/* Professional Introduction */}
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-[#00d4ff] to-white bg-clip-text text-transparent leading-tight">
                {user_info.main.name}
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-[#00d4ff] mb-4 font-medium">
                {user_info.main.role}
              </h2>

              {/* Value Proposition */}
              <p className="text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mb-6 font-light">
                Building scalable web applications that drive business growth and exceptional user experiences
              </p>
            </div>

            {/* Key Metrics */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mb-8">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[#00d4ff]">6+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[#00d4ff]">50+</div>
                <div className="text-sm text-white/70">Projects Delivered</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-[#00d4ff]">5</div>
                <div className="text-sm text-white/70">Countries Served</div>
              </div>
            </div>

            {/* Professional Summary */}
            <p className="text-lg text-white/85 leading-relaxed max-w-4xl mb-10">
              {user_info.main.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#projects"
                className="px-10 py-4 bg-[#00d4ff] text-black font-semibold rounded-xl hover:bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#00d4ff]/30 transform hover:-translate-y-1 text-center"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-10 py-4 border-2 border-[#00d4ff] text-[#00d4ff] font-semibold rounded-xl hover:bg-[#00d4ff] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <span>Let's Connect</span>
                <IoIosArrowForward />
              </a>
            </div>
            
            {/* Professional Links */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-white/70">
              <a 
                href={`mailto:${user_info.main.email}`} 
                className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors text-sm"
              >
                <span className="w-2 h-2 bg-[#00d4ff] rounded-full"></span>
                {user_info.main.email}
              </a>
              <a 
                href={user_info.socials.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors text-sm"
              >
                <span className="w-2 h-2 bg-[#00d4ff] rounded-full"></span>
                LinkedIn Profile
              </a>
              <a 
                href={user_info.socials.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00d4ff] transition-colors text-sm"
              >
                <span className="w-2 h-2 bg-[#00d4ff] rounded-full"></span>
                GitHub Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
