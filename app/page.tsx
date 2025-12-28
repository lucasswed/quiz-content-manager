import QuestionManager from '@/components/QuestionManager';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Quiz Content Manager
        </h1>
        <QuestionManager />
      </div>
    </div>
  );
}
