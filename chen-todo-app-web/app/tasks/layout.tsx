'use client';

import Link from 'next/link';
import { TaskProvider } from '@/context/TaskContext';

export default function TasksLayout({ children }: { children: React.ReactNode }) {
  return (
    <TaskProvider>
      <div className="max-w-xl mx-auto p-4">
        {/* 頁面上方導覽列 */}
        <header className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">ToDo List</h1>
          <nav>
            <Link href="/tasks" className="mr-4 text-blue-600 hover:underline">
              任務列表
            </Link>
            <Link href="/tasks/new" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              新增任務
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </TaskProvider>
  );
}
