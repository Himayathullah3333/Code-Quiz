import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, quizScore, correctAnswers, wrongAnswers } = body;

    if (!userId || quizScore === undefined || correctAnswers === undefined || wrongAnswers === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    let existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { quizResults: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (existingUser.quizResults && existingUser.quizResults.length > 0) {
      // Update existing quiz result
      const updatedUserStats = await prisma.quizResult.update({
        where: { id: existingUser.quizResults[0].id },
        data: {
          quizScore: existingUser.quizResults[0].quizScore + quizScore,
          correctAnswers: existingUser.quizResults[0].correctAnswers + correctAnswers,
          wrongAnswers: existingUser.quizResults[0].wrongAnswers + wrongAnswers,
        },
      });
      return NextResponse.json({ success: true, data: updatedUserStats });
    } else {
      // Create new quiz result
      const newQuizResult = await prisma.quizResult.create({
        data: {
          userId: userId,
          quizScore: quizScore,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
        },
      });
      return NextResponse.json({ success: true, data: newQuizResult });
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}