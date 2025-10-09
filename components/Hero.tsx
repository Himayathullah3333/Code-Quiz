'use client';
import Link from "next/link";
import { useMemo, useState } from "react";

const categories = [
  { label: "cyber security", value: "javascript" },
  { label: "Information Technology", value: "information-technology" },
  { label: "AI & DS", value: "aids" },
  { label: "CSE", value: "cse" },
  { label: "AI & ML", value: "sales" },
];

const Hero = () => {
  const [category, setCategory] = useState<string>("javascript");

  const [count, setCount] = useState<number>(60);

  const startHref = useMemo(() => {
    const safeCount = Math.max(2, Math.min(60, Number(count) || 60));
    const safeCategory = categories.some(c => c.value === category)
      ? category
      : "javascript";
    const search = new URLSearchParams({ category: safeCategory, count: String(safeCount) });
    return `/quiz?${search.toString()}`;
  }, [category, count]);

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center text-center px-4">
      <div className="max-w-[1400px] w-full flex flex-col items-center justify-center">
        <div className="card w-full p-10 flex flex-col items-center justify-center">
          <div className="space-y-6 text-center">
            <span className="chip">Weekly Challenge</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              {' '}
              <span className="bg-gradient-to-l from-[#9788F9] via-[#E37AF9] to-[#3DC8F0]
                 bg-clip-text text-transparent">
  Sree Sastha CodeQuiz
</span>

            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
              pick the respected department
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-5 w-full">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <label className="text-white/90">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl px-4 py-2 bg-white text-gray-900 shadow-md"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <label className="text-white/90">Questions</label>
              <span className="w-24 rounded-xl px-4 py-2 bg-white text-gray-900 shadow-md font-semibold flex items-center justify-center">{count}</span>
            </div>

            <Link href={startHref} className="btn-primary mt-4">
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
