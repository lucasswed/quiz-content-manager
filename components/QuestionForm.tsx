'use client';

import { useState } from 'react';

interface QuestionFormProps {
  onQuestionCreated: () => void;
}

export default function QuestionForm({ onQuestionCreated }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    difficulty: '',
    themes: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const themesArray = formData.themes
        .split(',')
        .map((theme) => theme.trim())
        .filter((theme) => theme !== '');

      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          themes: themesArray,
        }),
      });

      if (response.ok) {
        setFormData({
          question: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          correctAnswer: '',
          difficulty: '',
          themes: '',
        });
        onQuestionCreated();
      } else {
        alert('Failed to create question');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Failed to create question');
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <textarea
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the question"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="optionA" className="block text-sm font-medium text-gray-700 mb-1">
            Option A
          </label>
          <input
            type="text"
            id="optionA"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option A"
          />
        </div>

        <div>
          <label htmlFor="optionB" className="block text-sm font-medium text-gray-700 mb-1">
            Option B
          </label>
          <input
            type="text"
            id="optionB"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option B"
          />
        </div>

        <div>
          <label htmlFor="optionC" className="block text-sm font-medium text-gray-700 mb-1">
            Option C
          </label>
          <input
            type="text"
            id="optionC"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option C"
          />
        </div>

        <div>
          <label htmlFor="optionD" className="block text-sm font-medium text-gray-700 mb-1">
            Option D
          </label>
          <input
            type="text"
            id="optionD"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Option D"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
            Correct Answer
          </label>
          <select
            id="correctAnswer"
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
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            Difficulty
          </label>
          <select
            id="difficulty"
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
        <label htmlFor="themes" className="block text-sm font-medium text-gray-700 mb-1">
          Themes (comma-separated)
        </label>
        <input
          type="text"
          id="themes"
          name="themes"
          value={formData.themes}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Math, Algebra, Geometry"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? 'Creating...' : 'Create Question'}
      </button>
    </form>
  );
}
