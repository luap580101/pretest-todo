import TaskForm from '@/components/TaskForm';

export default function NewTaskPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">新增任務</h2>
      <TaskForm />
    </div>
  );
}
