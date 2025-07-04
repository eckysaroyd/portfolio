import { FaFigma } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaDocker, FaAws, FaGitAlt, FaReact, FaVuejs, FaWordpress } from "react-icons/fa6"; // Added FaWordpress
import { IoLogoJavascript, IoLogoHtml5, IoLogoCss3 } from "react-icons/io";
import { IoLogoFirebase } from "react-icons/io5";
import { SiExpress, SiLaravel, SiTailwindcss, SiBootstrap, SiTypescript, SiMysql, SiMongodb, SiCodeigniter } from "react-icons/si"; // Added SiCodeigniter

function Skills() {
  return (
    <section id="skills" className="mx-4 lg:mx-20">
      {/* =========== SKILLS TITLE =========== */}
      <h4 className="text-4xl font-bold text-center mt-20 dark:text-white">
        Technologies I Use.
      </h4>
      {/* =========== LIST OF SKILLS =========== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-8">
        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <IoLogoHtml5 className="text-2xl" /> HTML
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <IoLogoCss3 className="text-2xl" /> CSS
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiTailwindcss className="text-2xl" /> Tailwind CSS
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiBootstrap className="text-2xl" /> Bootstrap
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaReact className="text-2xl" /> React.js
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaVuejs className="text-2xl" /> Vue.js
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <IoLogoJavascript className="text-2xl" /> JavaScript
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiTypescript className="text-2xl" /> TypeScript
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <BiLogoPostgresql className="text-2xl" /> PostgreSQL
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiMysql className="text-2xl" /> MySQL
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiMongodb className="text-2xl" /> MongoDB
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiLaravel className="text-2xl" /> Laravel
        </span>
        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiCodeigniter className="text-2xl" /> CodeIgniter
        </span>
        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaWordpress className="text-2xl" /> WordPress
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <SiExpress className="text-2xl" /> Express.js
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <IoLogoFirebase className="text-2xl" /> Firebase
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaGitAlt className="text-2xl" /> Git
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaDocker className="text-2xl" /> Docker
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaAws className="text-2xl" /> AWS
        </span>

        <span className="inline-flex items-center justify-between gap-x-2 py-4 px-3 hover:-translate-y-1.5 transition-translate duration-500 rounded-xl font-medium bg-[#a039b461]  text-[#c312e3] dark:bg-[#985fa23d] dark:text-[#c312e3]">
          <FaFigma className="text-2xl" /> Figma
        </span>
      </div>
    </section>
  );
}

export default Skills;
