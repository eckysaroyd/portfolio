import user_info from "../../data/user_info.js";

import { FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function Contact() {
  return (
    <section id="contact" className="mt-16 pt-12 px-6 lg:px-24">
      {/* =========== TITLE =========== */}
      <h5 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
      Connect With Me:{" "}
        <span className=" text-[#c312e3] dark:text-[#c312e3]">
           Explore Opportunities
        </span>
      </h5>

      {/* =========== DESCCRIPTION =========== */}
      <p className="mt-8 leading-7 text-base text-zinc-600 dark:text-zinc-300 font-light">
        {user_info.contact.description}
      </p>

      {/* =========== LINKS =========== */}
      <div className="mt-12">
        {/* =========== LINKEDIN =========== */}
        <a
          href={user_info.socials.linkedin}
          className="flex gap-4 text-zinc-600 dark:text-zinc-300 hover:dark:text-zinc-300 hover:text-zinc-700 transition-all duration-300 mt-4"
        >
          <FaLinkedin className="self-center text-lg text-[#c312e3] dark:text-[#c312e3]" />
          <span className="self-center">Follow on Linkedin</span>
        </a>
      </div>

      <hr className="mt-6 w-72 border dark:border-zinc-800" />

      {/* =========== EMAIL =========== */}
      <a
        href={`mailto:${user_info.main.email}`}
        className="flex mt-6 text-zinc-600 dark:text-zinc-300 hover:dark:text-zinc-300 gap-4 hover:text-zinc-700 transition-all duration-30"
      >
        <MdEmail className="self-center text-lg text-[#c312e3] dark:text-[#c312e3]" />
        <span>{user_info.main.email}</span>
      </a>
    </section>
  );
}

export default Contact;
