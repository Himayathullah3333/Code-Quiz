import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

async function getData() {
  try {
    const query = `*[_type == "questions"]{
      question,
      answers,
      correctAnswer
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
}

const page = async () => {
  try {
    const [questions, user] = await Promise.all([
      getData(),
      fetchUsers()
    ]);
    
    const userId = user?.data.user.id;

    if (!questions || questions.length === 0) {
      return (
        <div className="max-w-[1500px] mx-auto w-[90%] py-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Questions Available</h1>
          <p className="text-gray-400">Please check back later or contact support.</p>
        </div>
      );
    }

    if (!userId) {
      return (
        <div className="max-w-[1500px] mx-auto w-[90%] py-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400">Please sign in to take the quiz.</p>
        </div>
      );
    }

    return (
      <>
        <Quiz questions={questions} userId={userId} />
      </>
    );
  } catch (error) {
    console.error("Quiz page error:", error);
    return (
      <div className="max-w-[1500px] mx-auto w-[90%] py-10 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
        <p className="text-gray-400">Please try refreshing the page or contact support.</p>
      </div>
    );
  }
};

export default page;
