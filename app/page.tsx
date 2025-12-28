import QuestionManager from '@/components/QuestionManager';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Quiz Content Manager
        </h1>
        <QuestionManager />
      </div>
    </div>
  );
}
