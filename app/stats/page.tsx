import StatCard from "@/components/StatCard";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const page = async () => {
  try {
    const currentUser = await fetchUsers();
    
    if (!currentUser?.data?.user) {
      return (
        <div className="py-20 text-center">
          <h1 className="text-2xl">Please sign in to view your stats</h1>
        </div>
      );
    }

    const latestQuizResult = currentUser.data.quizResults[0];
    
    return (
      <div className="py-20">
        <div className="text-center mb-10 text-2xl uppercase">
          <h1>{currentUser.data.user.username} Stats 📊</h1>
        </div>
        <div className="max-w-[1500px] mx-auto w-[90%] grid sm:grid-cols-3 gap-10 justify-center">
          <StatCard
            title="Total Points"
            value={latestQuizResult?.quizScore || 0}
          />
          <StatCard
            title="Correct Answers"
            value={latestQuizResult?.correctAnswers || 0}
          />
          <StatCard
            title="Wrong Answers"
            value={latestQuizResult?.wrongAnswers || 0}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading stats:", error);
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl text-red-500">Something went wrong</h1>
        <p className="mt-4">Please try refreshing the page or contact support.</p>
      </div>
    );
  }
};

export default page;
