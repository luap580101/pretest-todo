'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskContext } from '@/context/TaskContext';
import { Task } from '@/types';

interface TaskFormProps {
  initialTask?: Task;
}

export default function TaskForm({ initialTask }: TaskFormProps) {
  const { addTask, updateTask } = useTaskContext();
  const router = useRouter();
  const isEdit = !!initialTask;

  // 表單狀態（名稱、描述）
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  // 錯誤訊息狀態（驗證或提交錯誤）
  const [error, setError] = useState<string>('');
  // 提交中狀態
  const [submitting, setSubmitting] = useState<boolean>(false);

  // 如果有提供 initialTask（編輯模式），預填表單資料
  useEffect(() => {
    if (initialTask) {
      setName(initialTask.name);
      setDescription(initialTask.description || '');
    }
  }, [initialTask]);

  // 表單提交處理（新增或更新任務）
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // 前端驗證：名稱必填
    if (!name.trim()) {
      setError('請輸入任務名稱');
      return;
    }

    // 前端驗證：標題長度
    if (name.length > 10) {
      setError("任務標題過長，需小於10個字")
      return
    }

    // 前端驗證：內容長度
    if (description.length > 30) {
      setError("任務內容過長，需小於30個字")
      return
    }

    setSubmitting(true);
    try {
      if (isEdit && initialTask) {
        // 編輯任務
        await updateTask(initialTask.id, {
          name: name.trim(),
          description: description.trim() || undefined,
          is_completed: initialTask.is_completed,
          updated_at: new Date().toISOString()
        });
      } else {
        // 新增任務
        await addTask({
          name: name.trim(),
          description: description.trim() || undefined,
          updated_at: new Date().toISOString()
        });
      }
      // 提交成功後導向任務列表頁
      router.push('/tasks');
    } catch (err: any) {
      // 捕捉提交失敗錯誤
      setError(err.message || (isEdit ? '更新任務失敗' : '新增任務失敗'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="mb-4">
        <label className="block font-medium mb-1">任務名稱</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="請輸入任務名稱"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">任務描述</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="選填，補充任務詳細資訊"
          rows={4}
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className={`px-4 py-2 rounded text-white ${submitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
      >
        {isEdit ? '儲存變更' : '新增任務'}
      </button>
    </form>
  );
}
