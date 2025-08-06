import Link from "next/link";

const Hero = () => {
  return (
    <section 
      className="relative w-full min-h-[500px] flex items-center justify-center text-center"
      style={{
        background: 'linear-gradient(135deg, #49c5b6 0%, #DF6C4F 50%, #ffffff 100%)'
      }}
    >
      <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white drop-shadow-lg">
            Ready to take this week's quiz?
          </h1>
          <p className="text-white/90 drop-shadow-md">
            Get ready to ace it.
          </p>
        </div>
        <div className="mt-6">
          <Link
            href={"/quiz"}
            className="inline-flex items-center justify-center rounded-md bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all duration-500 hover:bg-white/30 hover:scale-105"
          >
            Start Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
