import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const MAX_LIMIT = 1000;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    
    let limit: number | undefined;
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0 && parsedLimit <= MAX_LIMIT) {
        limit = parsedLimit;
      }
    }
    
    const questions = await prisma.question.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      ...(limit && { take: limit })
    });
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
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
