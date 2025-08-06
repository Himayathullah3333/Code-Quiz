import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const testQuestion = {
      _type: 'questions',
      question: 'What is the output of console.log(1 === true)?',
      answers: ['true', 'false', 'undefined', 'error'],
      correctAnswer: 'false'
    };

    const result = await client.create(testQuestion);
    
    return NextResponse.json({
      success: true,
      message: "Test question added successfully",
      data: result
    });
  } catch (error) {
    console.error("Error adding test question:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}