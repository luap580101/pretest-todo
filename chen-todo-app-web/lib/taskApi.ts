import {
  Task,
  TaskInput,
  TaskUpdateInput,
  TaskListResponse,
  TaskCreateResponse,
} from "@/types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://wayi.league-funny.com/api";

// 取得任務列表（可選擇篩選類型與分頁）
export async function getTasks(
  type: "all" | "completed" | "uncompleted" = "all",
  page: number = 1
): Promise<TaskListResponse> {
  const res = await fetch(`${API_BASE}/task?type=${type}&page=${page}`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

// 新增任務
export async function createTask(
  data: TaskInput & { is_completed?: boolean }
): Promise<TaskCreateResponse> {
  const res = await fetch(`${API_BASE}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  return res.json();
}

// 更新任務（完整更新）
export async function updateTask(
  id: number,
  data: TaskUpdateInput
): Promise<Task | null> {
  const res = await fetch(`${API_BASE}/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.status !== 200 ? res.json() : null;
}

// 更新任務狀態（部分更新）
export async function updateTaskStatus(
  id: number,
  is_completed: boolean
): Promise<Task | null> {
  const res = await fetch(`${API_BASE}/task/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_completed }),
  });
  if (!res.ok) {
    throw new Error("Failed to update task status");
  }
  return res.status !== 200 ? res.json() : null;
}

// 刪除任務
export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/task/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
  return;
}
