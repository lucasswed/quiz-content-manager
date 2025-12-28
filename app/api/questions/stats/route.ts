import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      select: {
        themes: true,
        difficulty: true,
      },
    });

    // Count questions by theme
    const themeStats: Record<string, number> = {};
    const difficultyStats: Record<string, number> = {};

    questions.forEach((question) => {
      // Count themes
      question.themes.forEach((theme) => {
        themeStats[theme] = (themeStats[theme] || 0) + 1;
      });

      // Count difficulties
      difficultyStats[question.difficulty] = (difficultyStats[question.difficulty] || 0) + 1;
    });

    return NextResponse.json({
      total: questions.length,
      byTheme: themeStats,
      byDifficulty: difficultyStats,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
