'use client';

import { Question } from './QuestionManager';

interface QuestionTableProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

export default function QuestionTable({ questions, onEdit, onDelete }: QuestionTableProps) {
  if (questions.length === 0) {
    return (
      <p className="text-gray-700 dark:text-gray-300 text-center py-8">No questions yet. Create your first question above!</p>
    );
  }

  return (
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {questions.map((question) => (
            <tr key={question.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
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
              <td className="px-6 py-4 text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(question)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(question.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
