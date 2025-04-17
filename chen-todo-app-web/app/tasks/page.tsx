'use client';

import Link from 'next/link';
import { useTaskContext } from '@/context/TaskContext';
import { Task } from '@/types';
import Pagination from '@/components/Pagination';
import FilterButton from '@/components/FilterButton';
import TaskItem from '@/components/TaskItem';

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
        <FilterButton label="全部" isActive={filter === 'all'} onClick={() => handleFilterChange('all')} />
        <FilterButton label="未完成" isActive={filter === 'uncompleted'} onClick={() => handleFilterChange('uncompleted')} />
        <FilterButton label="已完成" isActive={filter === 'completed'} onClick={() => handleFilterChange('completed')} />
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
            <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
          ))}
        </ul>
      )}
      <Pagination />
    </div>
  );
}
