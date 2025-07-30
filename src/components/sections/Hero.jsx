import user_info from "../../data/user_info.js";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef } from "react";

function Hero() {
  const desktopImageRef = useRef(null);
  const mobileImageRef = useRef(null);

  useEffect(() => {
    const createPixelExplodeAnimation = (imageElement) => {
      if (!imageElement) return;

      const container = imageElement.parentElement;
      const computedStyle = window.getComputedStyle(imageElement);
      const size = parseInt(computedStyle.width);
      const cols = 20;
      const rows = 20;
      const tileSize = size / cols;

      // Create grid overlay
      const grid = document.createElement('div');
      grid.style.position = 'absolute';
      grid.style.top = '0';
      grid.style.left = '0';
      grid.style.width = '100%';
      grid.style.height = '100%';
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      grid.style.borderRadius = 'inherit';
      grid.style.overflow = 'hidden';
      grid.style.pointerEvents = 'none';
      grid.style.opacity = '0';
      grid.style.transition = 'opacity 0.3s ease';

      // Create tiles
      const tiles = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const tile = document.createElement('div');
          tile.style.backgroundImage = `url(${user_info.main.photo})`;
          tile.style.backgroundSize = `${size}px ${size}px`;
          tile.style.backgroundPosition = `-${x * tileSize}px -${y * tileSize}px`;
          tile.style.transition = 'transform 1s ease, opacity 1s ease';
          tile.style.gridColumnStart = x + 1;
          tile.style.gridRowStart = y + 1;
          grid.appendChild(tile);
          tiles.push(tile);
        }
      }

      container.appendChild(grid);

      const explode = () => {
        // Hide original image
        imageElement.style.opacity = '0';
        // Show tiles and explode them
        grid.style.opacity = '1';
        tiles.forEach(tile => {
          tile.style.opacity = '1';
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.random() * 150 + 50;
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          tile.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
        });
      };

      const reassemble = () => {
        // Reassemble tiles back to original position
        tiles.forEach(tile => {
          tile.style.transform = 'translate(0, 0) rotate(0deg)';
          tile.style.opacity = '1';
        });
        // After reassembly, hide tiles and show original image
        setTimeout(() => {
          grid.style.opacity = '0';
          imageElement.style.opacity = '1';
        }, 1000);
      };

      const loopAnimation = () => {
        explode();
        setTimeout(reassemble, 2000);
        setTimeout(loopAnimation, 32000); // 2s explode + 30s stay
      };

      setTimeout(loopAnimation, 3000); // Start after 3 seconds
    };

    // Apply animation to both desktop and mobile images
    createPixelExplodeAnimation(desktopImageRef.current);
    createPixelExplodeAnimation(mobileImageRef.current);
  }, []);

  return (
    <section id="hero" className="pb-32 pt-24 sm:pt-28 md:pt-44 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Professional Badge */}
        <div className="flex justify-center lg:justify-start mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] text-sm font-medium backdrop-blur-sm">
            <div className="w-2 h-2 bg-[#00d4ff] rounded-full mr-2 animate-pulse"></div>
            Available for new opportunities
          </div>
        </div>

        {/* Desktop Profile Image - Floating */}
        <div className="hidden lg:block absolute top-0 right-0 xl:right-10 z-10">
          <div className="relative">
            {/* Glowing ring effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff]/30 to-transparent blur-xl animate-pulse"></div>
            
            {/* Main profile image */}
            <div className="relative bg-gradient-to-br from-[#00d4ff]/20 to-transparent p-1 rounded-full">
              <img
                ref={desktopImageRef}
                src={user_info.main.photo}
                className="rounded-full w-48 h-48 xl:w-56 xl:h-56 border-4 border-[#00d4ff]/50 shadow-2xl shadow-[#00d4ff]/20 object-cover backdrop-blur-sm"
                alt="Eckysaroyd Nyato - Full Stack Developer"
              />
            </div>
            
            {/* Floating accent dots */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00d4ff] rounded-full animate-bounce shadow-lg shadow-[#00d4ff]/50"></div>
            <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="text-center lg:text-left lg:pr-60">
          {/* Mobile Profile Image - Enhanced */}
          <div className="mb-8 lg:hidden">
            <div className="relative inline-block">
              {/* Mobile glowing effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff]/30 to-transparent blur-lg animate-pulse"></div>
              
              <div className="relative bg-gradient-to-br from-[#00d4ff]/20 to-transparent p-1 rounded-full">
                <img
                  ref={mobileImageRef}
                  src={user_info.main.photo}
                  className="rounded-full w-32 h-32 border-4 border-[#00d4ff]/50 shadow-2xl shadow-[#00d4ff]/20 object-cover"
                  alt="Eckysaroyd Nyato - Full Stack Developer"
                />
              </div>
              
              {/* Mobile accent dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00d4ff] rounded-full animate-bounce shadow-lg shadow-[#00d4ff]/50"></div>
            </div>
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
