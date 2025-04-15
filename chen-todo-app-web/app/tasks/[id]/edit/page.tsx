'use client';

import { useParams } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import TaskForm from '@/components/TaskForm';


export default function EditTaskPage() {
  const params = useParams();
  const id = Number(params.id);
  const { tasks, loading, error } = useTaskContext();

  const task = tasks.find((t) => t.id === id);

  if (error) {
    return <p className="text-red-500">載入任務失敗：{error}</p>;
  }
  if (loading) {
    return <p>載入中...</p>;
  }
  if (!task) {
    return <p className="text-gray-500">找不到該任務，可能已被刪除或尚未載入。</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">編輯任務</h2>
      <TaskForm initialTask={task} />
    </div>
  );
}
