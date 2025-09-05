'use client';
import Link from "next/link";
import { useMemo, useState } from "react";

const categories = [
  { label: "JavaScript", value: "javascript" },
  { label: "Information Technology", value: "information-technology" },
  { label: "AI & DS", value: "aids" },
  { label: "CSE", value: "cse" },
  { label: "Sales", value: "sales" },
];

const Hero = () => {
  const [category, setCategory] = useState<string>("javascript");
  const [count, setCount] = useState<number>(20);

  const startHref = useMemo(() => {
    const safeCount = Math.max(2, Math.min(20, Number(count) || 20));
    const safeCategory = categories.some(c => c.value === category)
      ? category
      : "javascript";
    const search = new URLSearchParams({ category: safeCategory, count: String(safeCount) });
    return `/quiz?${search.toString()}`;
  }, [category, count]);

  return (
    <section 
      className="relative w-full min-h-[60vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Removed gradient and glow backgrounds */}
      <div className="section-container">
        <div className="card">
          <div className="space-y-2">
            <span className="chip">Weekly Challenge</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Ace the <span className="gradient-text">CodeQuiz</span>
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Pick a category, set your question count, and challenge yourself. New questions every week.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-white/90">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl px-3 py-2 bg-white text-gray-900 shadow-md"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <label className="text-white/90">Questions</label>
              <span className="w-24 rounded-xl px-3 py-2 bg-white text-gray-900 shadow-md font-semibold flex items-center justify-center">{count}</span>
            </div>
            <Link href={startHref} className="btn-primary">
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
