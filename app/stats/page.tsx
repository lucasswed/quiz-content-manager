'use client';

import { useState, useEffect, useMemo } from 'react';
import { Question } from '@/components/QuestionManager';
import Link from 'next/link';

interface Stats {
  total: number;
  byTheme: Record<string, number>;
  byDifficulty: Record<string, number>;
}

export default function StatsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterTheme, setFilterTheme] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsRes = await fetch('/api/questions');

        if (questionsRes.ok) {
          const questionsData = await questionsRes.json();
          setQuestions(questionsData);
          
          // Calculate stats from questions data
          const themeStats: Record<string, number> = {};
          const difficultyStats: Record<string, number> = {};

          questionsData.forEach((question: Question) => {
            question.themes.forEach((theme) => {
              themeStats[theme] = (themeStats[theme] || 0) + 1;
            });
            difficultyStats[question.difficulty] = (difficultyStats[question.difficulty] || 0) + 1;
          });

          setStats({
            total: questionsData.length,
            byTheme: themeStats,
            byDifficulty: difficultyStats,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesTheme = !filterTheme || q.themes.includes(filterTheme);
      const matchesDifficulty = !filterDifficulty || q.difficulty === filterDifficulty;
      return matchesTheme && matchesDifficulty;
    });
  }, [questions, filterTheme, filterDifficulty]);

  const availableThemes = Array.from(
    new Set(questions.flatMap((q) => q.themes))
  ).sort();

  const availableDifficulties = Array.from(
    new Set(questions.map((q) => q.difficulty))
  ).sort();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors">
        <div className="container mx-auto px-4">
          <p className="text-gray-700 dark:text-gray-300 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Questions Statistics
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition-colors shadow-sm text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Total Questions
            </h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {stats?.total || 0}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Questions by Theme
            </h3>
            <div className="space-y-1">
              {stats?.byTheme &&
                Object.entries(stats.byTheme)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([theme, count]) => (
                    <div key={theme} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{theme}:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
                    </div>
                  ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              By Difficulty
            </h3>
            <div className="space-y-1">
              {stats?.byDifficulty &&
                Object.entries(stats.byDifficulty).map(([difficulty, count]) => (
                  <div key={difficulty} className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{difficulty}:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="filterTheme"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Filter by Theme
              </label>
              <select
                id="filterTheme"
                value={filterTheme}
                onChange={(e) => setFilterTheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-colors"
              >
                <option value="">All Themes</option>
                {availableThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme} ({stats?.byTheme[theme] || 0})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filterDifficulty"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Filter by Difficulty
              </label>
              <select
                id="filterDifficulty"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:text-white transition-colors"
              >
                <option value="">All Difficulties</option>
                {availableDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty} ({stats?.byDifficulty[difficulty] || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(filterTheme || filterDifficulty) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setFilterTheme('');
                  setFilterDifficulty('');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                Clear Filters
              </button>
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredQuestions.length} of {questions.length} questions
              </span>
            </div>
          )}
        </div>

        {/* Questions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            All Questions
          </h3>
          {filteredQuestions.length === 0 ? (
            <p className="text-gray-700 dark:text-gray-300 text-center py-8">
              No questions match the selected filters.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Options
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Correct
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Themes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredQuestions.map((question) => (
                    <tr
                      key={question.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                        <div className="max-w-xs truncate" title={question.question}>
                          {question.question}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        <div className="space-y-1">
                          <div>A: {question.optionA}</div>
                          <div>B: {question.optionB}</div>
                          <div>C: {question.optionC}</div>
                          <div>D: {question.optionD}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600 dark:text-green-400">
                        {question.correctAnswer}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.difficulty === 'Easy'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : question.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {question.themes.map((theme, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium"
                            >
                              {theme}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
