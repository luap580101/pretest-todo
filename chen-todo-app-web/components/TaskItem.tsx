import React from 'react';
import { Task } from '@/types';
import Link from 'next/link';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, newStatus: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li className="border-b pb-2 last:border-b-0">
      <div className="flex justify-between items-start">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.is_completed}
              onChange={(e) => onToggle(task.id, e.target.checked)}
              className="w-4 h-4"
            />
            <span className={`${task.is_completed ? 'line-through text-gray-400' : ''} text-xl`}>
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
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 hover:underline transition-colors duration-200 ease-in-out px-3 py-1 rounded-md border border-red-600 hover:bg-red-100"
          >
            刪除
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
