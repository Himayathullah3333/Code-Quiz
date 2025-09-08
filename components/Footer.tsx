import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full py-10 flex justify-center items-center
                       bg-gradient-to-r from-[#c04df1] via-[#a136e6] to-[#7b1ed6]">
      <div className="glass rounded-2xl px-8 py-5 shadow-lg shadow-fuchsia-500/30 border border-fuchsia-400/30 animate-pulse-glow">
        <span className="text-sm text-white/80 font-medium text-center block">
          Sree Sastha Institute of Engineering and Technology
          <br />
          © 2025 CodeQuiz • developed by Himayathullah / Hari Hara Nathan
        </span>
      </div>
    </footer>
  );
};

export default Footer;
