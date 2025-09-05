import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "../(auth)/actions/fetchUsers";

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

const allowedCategories = new Set(['javascript','information-technology','aids','cse','sales']);

async function getData(category: string) {
  try {
    const query = `*[_type == "questions" && category == $category]{
      question,
      answers,
      correctAnswer
    }`;

    const data = await client.fetch(query, { category });
    return data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
}

const page = async ({ searchParams }: { searchParams: { category?: string; count?: string } }) => {
  try {
    const rawCategory = (searchParams?.category || 'javascript').toLowerCase();
    const category = allowedCategories.has(rawCategory) ? rawCategory : 'javascript';

    // Respect count from URL again with bounds; default 20
    let count = Number(searchParams?.count ?? 20);
    if (isNaN(count)) count = 20;
    count = Math.max(2, Math.min(20, count));

    const [allCategoryQuestions, user] = await Promise.all([
      getData(category),
      fetchUsers()
    ]);

    const questions = (allCategoryQuestions || []).slice(0, count);

    const userId = user?.data.user.id;

    if (!questions || questions.length === 0) {
      return (
        <div className="max-w-[1500px] mx-auto w-[90%] py-10 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">No Questions Available</h1>
          <p className="text-gray-400">No questions found for the selected category.</p>
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
