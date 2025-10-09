'use client';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdQuiz } from "react-icons/md";
import UserMenu from "./UserMenu";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import sastha from "@/images/sastha.jpeg";

const categoryLabelMap: Record<string, string> = {
  javascript: "JavaScript",
  "information-technology": "Information Technology",
  aids: "AI & DS",
  cse: "CSE",
  sales: "Sales",
};

const Navbar = () => {
  const searchParams = useSearchParams();
  const categoryLabel = useMemo(() => {
    const c = (searchParams.get("category") || "javascript").toLowerCase();
    return categoryLabelMap[c] || "JavaScript";
  }, [searchParams]);

  return (
    <div className="pt-5 w-full sticky top-0 z-50">
      <div className="section-container flex justify-between items-center rounded-2xl glass px-4 py-3">
        <div>
          <Link
            href={"/"}
            className="flex gap-2 items-center text-2xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-l from-[#9788F9] via-[#E37AF9] to-[#3DC8F0]
                             bg-clip-text text-transparent">
              CodeQuiz
            </span>
            <Image src={sastha} alt="CodeQuiz logo" width={28} height={28} className="rounded-sm drop-shadow-md" />
          </Link>
        </div>

        <div /> {/* Removed category chip */}

        <div className="flex items-center gap-3 justify-end">
          <UserMenu />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
