import { AppContext } from "../App.jsx";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AnimatedStarfield from "../components/AnimatedStarfield.jsx";

import Hero from "../components/sections/Hero.jsx";
import Projects from "../components/sections/Projects.jsx";
import Contact from "../components/sections/Contact.jsx";
import Footer from "../components/sections/Footer.jsx";
import EducationAndExperience from "../components/sections/EducationAndExperience.jsx";
import Skills from "../components/sections/Skills.jsx";

function Homepage() {
  const { theme, switchTheme } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      <AnimatedStarfield />
      <div className="relative z-10">
        <div className="xl:w-[1200px] md:mx-auto h-full border-x border-white/10 bg-black/30 backdrop-blur-md rounded-3xl mt-10 mb-10 border border-white/10 px-6 lg:px-12">

          <Hero />
          <Projects />
          <EducationAndExperience />
          <Skills />
          <Contact />

          <hr className="mt-12 border border-white/20" />
          <Footer theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;