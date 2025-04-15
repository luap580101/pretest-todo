'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as TaskApi from '@/lib/taskApi';
import { Task, TaskInput, TaskUpdateInput } from '@/types';

interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  error: string;
  addTask: (data: TaskInput) => Promise<void>;
  updateTask: (id: number, data: TaskUpdateInput) => Promise<void>;
  toggleTaskCompletion: (id: number, completed: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filter: string;
  setFilter: (filter: 'all' | 'completed' | 'uncompleted') => void;
  setTasks: (tasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');


  // 所有任務
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await TaskApi.getTasks(filter, currentPage);

        setTasks(allTasks.data);
        setError('');
      } catch (err: any) {
        console.error(err);
        setError('無法載入任務列表');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [currentPage, filter]);

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  // 新增任務
  const addTask = async (data: TaskInput) => {
    const newTask = await TaskApi.createTask({ ...data, is_completed: false, created_at: new Date().toISOString() });
    setTasks((prev) => [newTask.data, ...prev]);
  };

  // 更新任務（名稱/描述）
  const updateTask = async (id: number, data: TaskUpdateInput) => {
    const updatedTask = await TaskApi.updateTask(id, data);

    if (updatedTask) {
      // 以後端回傳結果更新清單
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } else {
      // 若後端未回傳資料，則手動更新本地資料
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, name: data.name, description: data.description, is_completed: data.is_completed, updated_at: new Date().toISOString() }
            : t
        )
      );
    }
  };

  // 切換任務完成狀態
  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    const updatedTask = await TaskApi.updateTaskStatus(id, completed);
    if (updatedTask) {
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
    } else {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, is_completed: completed, updated_at: new Date().toISOString() } : t
        )
      );
    }
  };

  // 刪除任務
  const deleteTask = async (id: number) => {
    await TaskApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const value: TaskContextValue = {
    tasks,
    setTasks,
    loading,
    error,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    currentPage,
    setCurrentPage,
    filter,
    setFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext 必須在 TaskProvider 中使用');
  }
  return context;
}
