import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full py-10 flex justify-center items-center bg-transparent">
      <div className="glass rounded-2xl px-8 py-5 shadow-lg shadow-fuchsia-500/30 border border-fuchsia-400/30 animate-pulse-glow">
        <span className="text-sm text-white/80 font-medium">
        Sree Sastha Institute of Engineering and Technology
        © 2025 CodeQuiz • developed by Himayathullah / Hari
        </span>
      </div>
    </footer>
  );
};

export default Footer;
