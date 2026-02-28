import type { Entity, Timestamps } from "./common.type";

export const TodoStatus = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];

export interface Todo extends Entity, Timestamps {
  name: string;
  description?: string;
  status: TodoStatus;
}

export interface CreateTodoRequest {
  name: string;
  description?: string;
}

export interface UpdateTodoRequest {
  name: string;
  description?: string;
}

export interface UpdateTodoStatusRequest {
  status: TodoStatus;
}
