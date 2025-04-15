'use client';

import Link from 'next/link';
import { useTaskContext } from '@/context/TaskContext';
import { Task } from '@/types';
import Pagination from '@/components/Pagination';

export default function TaskListPage() {
  const { tasks, loading, error, toggleTaskCompletion, deleteTask, filter, setFilter } = useTaskContext();

  let filteredTasks: Task[] = tasks;
  if (filter === 'completed') {
    filteredTasks = tasks.filter((t) => t.is_completed);
  } else if (filter === 'uncompleted') {
    filteredTasks = tasks.filter((t) => !t.is_completed);
  }

  const handleFilterChange = (newFilter: 'all' | 'completed' | 'uncompleted') => {
    setFilter(newFilter);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('確認要刪除這項任務嗎？')) return;
    try {
      await deleteTask(id);

    } catch (err: any) {
      alert(err.message || '刪除任務失敗');
    }
  };

  const handleToggle = async (id: number, newStatus: boolean) => {
    try {
      await toggleTaskCompletion(id, newStatus);
    } catch (err: any) {
      alert(err.message || '更新任務狀態失敗');
    }
  };

  if (error) {
    return <p className="text-red-500">載入任務失敗：{error}</p>;
  }

  if (loading) {
    return <p>載入中...</p>;
  }

  return (
    <div>
      <div className="mb-4 space-x-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          全部
        </button>
        <button
          onClick={() => handleFilterChange('uncompleted')}
          className={`px-3 py-1 rounded ${filter === 'uncompleted' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          未完成
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          已完成
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">
          {filter === 'all'
            ? '目前沒有任務'
            : filter === 'completed'
              ? '沒有已完成的任務'
              : '沒有未完成的任務'}
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li key={task.id} className="border-b pb-2 last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      onChange={(e) => handleToggle(task.id, e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className={`${task.is_completed ? 'line-through text-gray-400' : ''} text-xl`}>
                      <span className=''></span>
                      標題：{task.name}
                    </span>
                  </label>
                  {task.description && (
                    <p className="ml-6 text-sm text-gray-600">內容：{task.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0 pl-4 flex items-center space-x-4">
                  <Link
                    href={`/tasks/${task.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 ease-in-out px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-100"
                  >
                    編輯
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:text-red-800 hover:underline transition-colors duration-200 ease-in-out px-3 py-1 rounded-md border border-red-600 hover:bg-red-100"
                  >
                    刪除
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Pagination />
    </div>
  );
}
