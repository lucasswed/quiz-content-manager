'use client';

import { useState, useEffect } from 'react';
import { Question } from './QuestionManager';

interface EditModalProps {
  question: Question;
  onClose: () => void;
  onUpdate: (question: Question) => void;
}

export default function EditModal({ question, onClose, onUpdate }: EditModalProps) {
  const [formData, setFormData] = useState({
    question: question.question,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,
    correctAnswer: question.correctAnswer,
    difficulty: question.difficulty,
    themes: question.themes.join(', '),
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const themesArray = formData.themes
        .split(',')
        .map((theme) => theme.trim())
        .filter((theme) => theme !== '');

      onUpdate({
        ...question,
        ...formData,
        themes: themesArray,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Edit Question</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="edit-question" className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <textarea
              id="edit-question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-optionA" className="block text-sm font-medium text-gray-700 mb-1">
                Option A
              </label>
              <input
                type="text"
                id="edit-optionA"
                name="optionA"
                value={formData.optionA}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="edit-optionB" className="block text-sm font-medium text-gray-700 mb-1">
                Option B
              </label>
              <input
                type="text"
                id="edit-optionB"
                name="optionB"
                value={formData.optionB}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="edit-optionC" className="block text-sm font-medium text-gray-700 mb-1">
                Option C
              </label>
              <input
                type="text"
                id="edit-optionC"
                name="optionC"
                value={formData.optionC}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="edit-optionD" className="block text-sm font-medium text-gray-700 mb-1">
                Option D
              </label>
              <input
                type="text"
                id="edit-optionD"
                name="optionD"
                value={formData.optionD}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                Correct Answer
              </label>
              <select
                id="edit-correctAnswer"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select correct answer</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div>
              <label htmlFor="edit-difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="edit-difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="edit-themes" className="block text-sm font-medium text-gray-700 mb-1">
              Themes (comma-separated)
            </label>
            <input
              type="text"
              id="edit-themes"
              name="themes"
              value={formData.themes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? 'Updating...' : 'Update Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
