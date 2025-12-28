import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // TEMPORARY: Return mock data for testing badge styles
  const mockData = [
    {
      id: "test-1",
      question: "What is 2 + 2?",
      optionA: "3",
      optionB: "4",
      optionC: "5",
      optionD: "6",
      correctAnswer: "B",
      difficulty: "Easy",
      themes: ["Math", "Arithmetic"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "test-2",
      question: "What is the capital of France?",
      optionA: "London",
      optionB: "Berlin",
      optionC: "Paris",
      optionD: "Madrid",
      correctAnswer: "C",
      difficulty: "Medium",
      themes: ["Geography", "Europe"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: "test-3",
      question: "What is the speed of light?",
      optionA: "299,792 km/s",
      optionB: "150,000 km/s",
      optionC: "100,000 km/s",
      optionD: "500,000 km/s",
      correctAnswer: "A",
      difficulty: "Hard",
      themes: ["Physics", "Science"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z"
    }
  ];
  return NextResponse.json(mockData);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, optionA, optionB, optionC, optionD, correctAnswer, difficulty, themes } = body;

    // Validate required fields
    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer || !difficulty) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const newQuestion = await prisma.question.create({
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        difficulty,
        themes: themes || [],
      },
    });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
