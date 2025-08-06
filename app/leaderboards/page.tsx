import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const page = async () => {
  try {
    const users = await prisma.user.findMany({
      include: { quizResults: true },
    });

    // Sort users by total quiz score
    users.sort(
      (a, b) =>
        b.quizResults.reduce(
          (acc, curr) => acc + curr.quizScore,
          0
        ) -
        a.quizResults.reduce(
          (acc, curr) => acc + curr.quizScore,
          0
        )
    );

    return (
      <div className="max-w-[1500px] mx-auto w-[90%] py-10 bg-gray-900 min-h-screen">
        <h1 className="font-bold mb-8 text-center text-3xl uppercase text-neon-cyan neon-text">
          🏆 Leaderboards 🏆
        </h1>
        {users.length === 0 ? (
          <div className="text-center py-8 bg-gradient-to-r from-cyber-darker to-cyber-blue rounded-lg border border-neon-cyan/30">
            <p className="text-neon-cyan text-lg mb-2">No users have taken the quiz yet!</p>
            <p className="text-gray-300 text-sm">Be the first to start the quiz and claim the top spot! 🚀</p>
          </div>
        ) : (
          <ol className="space-y-4">
            {users.map((user, index) => (
              <li
                key={user.id}
                className={`py-6 px-8 rounded-lg bg-gradient-to-r from-cyber-darker/80 to-cyber-blue/80 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${
                  index === 0 ? "border-yellow-400/60 shadow-lg shadow-yellow-400/20" :
                  index === 1 ? "border-gray-300/60 shadow-lg shadow-gray-300/20" :
                  index === 2 ? "border-orange-400/60 shadow-lg shadow-orange-400/20" :
                  "border-neon-cyan/30"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-4 items-center">
                    <div className={`text-2xl font-bold w-8 text-center ${
                      index === 0 ? 'text-yellow-400 neon-text' : 
                      index === 1 ? 'text-gray-300' : 
                      index === 2 ? 'text-orange-400' : 'text-neon-cyan'
                    }`}>
                      {index + 1}
                    </div>
                    <Image
                      src={user.profilePic || '/default-avatar.png'}
                      width={40}
                      height={40}
                      alt={`Image of ${user.username}`}
                      className="rounded-full border-2 border-neon-cyan/50"
                    />
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold text-white">
                        {user.username}
                      </span>
                      <span className="text-sm text-gray-400">
                        {user.quizResults.length} quiz{user.quizResults.length !== 1 ? 'es' : ''} taken
                      </span>
                    </div>
                    {index === 0 && (
                      <FaCrown className="text-yellow-500 text-2xl animate-pulse ml-2" />
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neon-green font-mono">
                      {user.quizResults.reduce(
                        (acc, curr) => acc + curr.quizScore,
                        0
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      Total Score
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return (
      <div className="max-w-[1500px] mx-auto w-[90%] py-10">
        <h1 className="font-bold mb-4 text-center text-2xl uppercase text-white">
          Leaderboards 🏆
        </h1>
        <div className="text-center text-red-400 py-8">
          <p>Sorry, we couldn't load the leaderboard right now.</p>
          <p className="text-sm mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default page;
