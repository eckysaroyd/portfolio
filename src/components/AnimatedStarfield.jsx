import { useEffect, useRef } from 'react';

const AnimatedStarfield = () => {
  const containerRef = useRef(null);
  const starsRef = useRef([]);
  const constellationLinesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const starCount = 200;
    const starChars = ["★", "☆", "✦", "✧", "✩", "✪"];
    
    // Clear any existing content
    container.innerHTML = '';
    starsRef.current = [];

    // Create moon with enhanced glow
    const moon = document.createElement('div');
    moon.className = 'absolute top-10 right-10 w-20 h-20 rounded-full overflow-hidden';
    moon.style.background = 'radial-gradient(circle at 70% 30%, #fff 60%, #ddd 100%)';
    moon.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
    moon.style.animation = 'moonGlow 4s ease-in-out infinite alternate';
    
    const moonOverlay = document.createElement('div');
    moonOverlay.className = 'absolute top-0 left-1/2 w-full h-full rounded-full';
    moonOverlay.style.background = 'linear-gradient(180deg, #000428 0%, #004e92 100%)';
    moon.appendChild(moonOverlay);
    
    container.appendChild(moon);

    // Create planet
    const planet = document.createElement('div');
    planet.className = 'absolute bottom-16 left-20 w-10 h-10 rounded-full';
    planet.style.background = 'radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a24)';
    planet.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.5)';
    planet.style.animation = 'planetPulse 6s ease-in-out infinite alternate';
    container.appendChild(planet);

    // Create stars with enhanced variety
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'absolute text-white opacity-80 star-twinkle pointer-events-none';
      star.style.textShadow = '0 0 5px white';
      
      // Random star character
      star.innerHTML = starChars[Math.floor(Math.random() * starChars.length)];
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      star.style.left = x + 'px';
      star.style.top = y + 'px';
      
      // Random size class with weighted distribution
      const sizes = ['star-small', 'star-medium', 'star-large'];
      const weights = [0.6, 0.3, 0.1]; // More small stars
      const randomSize = Math.random();
      let sizeClass;
      if (randomSize < weights[0]) sizeClass = sizes[0];
      else if (randomSize < weights[0] + weights[1]) sizeClass = sizes[1];
      else sizeClass = sizes[2];
      
      star.classList.add(sizeClass);
      
      // Random animation delay
      star.style.animationDelay = Math.random() * 3 + 's';
      
      container.appendChild(star);
      starsRef.current.push({ element: star, x: x, y: y });
      
      return star;
    };

    // Create initial stars
    for (let i = 0; i < starCount; i++) {
      createStar();
    }

    // Shooting star function
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      
      // Random starting position (top area)
      shootingStar.style.top = Math.random() * 200 + 'px';
      shootingStar.style.left = Math.random() * (window.innerWidth - 300) + 'px';
      
      container.appendChild(shootingStar);
      
      // Remove after animation
      setTimeout(() => {
        if (shootingStar.parentNode) {
          shootingStar.parentNode.removeChild(shootingStar);
        }
      }, 3000);
    };

    // Constellation lines function
    const createConstellations = () => {
      // Clear existing lines
      constellationLinesRef.current.forEach(line => {
        if (line.parentNode) {
          line.parentNode.removeChild(line);
        }
      });
      constellationLinesRef.current = [];

      // Create constellation patterns
      for (let i = 0; i < 8; i++) {
        const stars = starsRef.current;
        if (stars.length < 2) continue;
        
        const startStar = stars[Math.floor(Math.random() * stars.length)];
        const nearbyStars = stars.filter(star => {
          const distance = Math.sqrt(
            Math.pow(star.x - startStar.x, 2) + 
            Math.pow(star.y - startStar.y, 2)
          );
          return distance < 150 && distance > 0;
        });
        
        if (nearbyStars.length > 0) {
          const endStar = nearbyStars[Math.floor(Math.random() * nearbyStars.length)];
          
          const line = document.createElement('div');
          line.className = 'constellation-line';
          
          const length = Math.sqrt(
            Math.pow(endStar.x - startStar.x, 2) + 
            Math.pow(endStar.y - startStar.y, 2)
          );
          
          const angle = Math.atan2(endStar.y - startStar.y, endStar.x - startStar.x) * 180 / Math.PI;
          
          line.style.width = length + 'px';
          line.style.left = startStar.x + 'px';
          line.style.top = startStar.y + 'px';
          line.style.transform = `rotate(${angle}deg)`;
          
          container.appendChild(line);
          constellationLinesRef.current.push(line);
        }
      }
    };

    // Add more stars periodically
    const addMoreStars = () => {
      for (let i = 0; i < 30; i++) {
        createStar();
      }
    };

    // Auto-shooting stars interval
    const shootingStarInterval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% chance every 4 seconds
        createShootingStar();
      }
    }, 4000);

    // Auto-constellation updates
    const constellationInterval = setInterval(() => {
      createConstellations();
    }, 15000); // Update constellations every 15 seconds

    // Add more stars periodically
    const moreStarsInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 20 seconds
        addMoreStars();
      }
    }, 20000);

    // Initial constellation creation
    setTimeout(() => createConstellations(), 2000);

    // Cleanup function
    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(constellationInterval);
      clearInterval(moreStarsInterval);
      if (container) {
        container.innerHTML = '';
      }
      starsRef.current = [];
      constellationLinesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ 
        zIndex: -1,
        background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)'
      }}
    />
  );
};

export default AnimatedStarfield;