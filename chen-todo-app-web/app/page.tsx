import Link from 'next/link';

export default function TasksPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link href="/tasks">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          前往任務頁面
        </button>
      </Link>
    </div>
  );
}