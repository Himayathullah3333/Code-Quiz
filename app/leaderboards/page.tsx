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
      <div className="max-w-[1500px] mx-auto w-[90%] py-10">
        <h1 className="font-bold mb-4 text-center text-2xl uppercase text-white">
          Leaderboards 🏆
        </h1>
        {users.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No users have taken the quiz yet!</p>
            <p className="text-sm mt-2">Be the first to start the quiz and claim the top spot! 🚀</p>
          </div>
        ) : (
          <ol className="space-y-2">
            {users.map((user, index) => (
              <li
                key={user.id}
                className={`py-4 px-6 rounded-lg bg-gradient-to-r from-cyber-darker to-cyber-blue border border-neon-cyan/20 ${
                  index < 3 ? "font-bold border-neon-cyan/40" : ""
                }`}
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="flex sm:flex-row flex-col gap-1 justify-between w-full items-center">
                    <div className="flex gap-3 items-center">
                      <span className={`text-xl mb-1 ${
                        index === 0 ? 'text-yellow-400' : 
                        index === 1 ? 'text-gray-300' : 
                        index === 2 ? 'text-orange-400' : 'text-white'
                      }`}>
                        {index + 1}
                      </span>
                      <Image
                        src={user.profilePic || '/default-avatar.png'}
                        width={30}
                        height={30}
                        alt={`Image of ${user.username}`}
                        className="rounded-full border-2 border-neon-cyan/30"
                      />
                      <span className="text-xl text-white">
                        {user.username}
                      </span>
                      {index === 0 && (
                        <FaCrown className="inline-block w-6 h-6 text-yellow-500 mb-1 animate-pulse" />
                      )}
                    </div>
                    <span className="text-neon-green font-mono">
                      Score: {user.quizResults.reduce(
                        (acc, curr) => acc + curr.quizScore,
                        0
                      )}
                    </span>
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
