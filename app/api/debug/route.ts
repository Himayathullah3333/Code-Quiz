import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { currentUser } from "@clerk/nextjs";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test Sanity connection
    const query = `*[_type == "questions"]{
      question,
      answers,
      correctAnswer
    }`;
    
    const questions = await client.fetch(query);
    
    // Test Clerk connection
    let clerkUser = null;
    try {
      clerkUser = await currentUser();
    } catch (clerkError) {
      console.error("Clerk error:", clerkError);
    }
    
    return NextResponse.json({
      success: true,
      data: {
        sanity: {
          connected: true,
          questionsCount: questions?.length || 0,
          questions: questions || [],
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        },
        clerk: {
          connected: !!clerkUser,
          userId: clerkUser?.id || null,
          username: clerkUser?.username || clerkUser?.firstName || null,
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
        }
      }
    });
  } catch (error) {
    console.error("Debug API Error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
    }, { status: 500 });
  }
}