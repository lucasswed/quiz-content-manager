import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { question, optionA, optionB, optionC, optionD, correctAnswer, difficulty, themes } = body;

    const updatedQuestion = await prisma.question.update({
      where: { id },
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

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.question.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}
