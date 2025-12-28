'use client';

import { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
import QuestionTable from './QuestionTable';
import EditModal from './EditModal';

export interface Question {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  difficulty: string;
  themes: string[];
  createdAt: string;
  updatedAt: string;
}

export default function QuestionManager() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleQuestionCreated = () => {
    fetchQuestions();
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchQuestions();
      } else {
        alert('Failed to delete question');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question');
    }
  };

  const handleUpdate = async (updatedQuestion: Question) => {
    try {
      const response = await fetch(`/api/questions/${updatedQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestion),
      });

      if (response.ok) {
        setEditingQuestion(null);
        fetchQuestions();
      } else {
        alert('Failed to update question');
      }
    } catch (error) {
      console.error('Error updating question:', error);
      alert('Failed to update question');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Add New Question</h2>
        <QuestionForm onQuestionCreated={handleQuestionCreated} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Questions</h2>
        {loading ? (
          <p className="text-black dark:text-white">Loading questions...</p>
        ) : (
          <QuestionTable
            questions={questions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {editingQuestion && (
        <EditModal
          question={editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
