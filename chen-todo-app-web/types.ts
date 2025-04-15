export interface Task {
  id: number;
  name: string;
  description?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskInput {
  name: string;
  description?: string;
  is_completed?: boolean;
  created_at?: string;
  updated_at: string;
}

export interface TaskUpdateInput extends TaskInput {
  is_completed: boolean;
}

export interface TaskListResponse {
  data: Task[];
  total: number;
  page: number;
}

export interface TaskCreateResponse {
  data: Task;
  status: string;
}
