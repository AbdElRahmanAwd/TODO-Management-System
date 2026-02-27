import { TodoStatus } from "../enums/todo-status.enum";

export type TodoDto = {
  name: string;
  description?: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTodoDto = Pick<TodoDto, "name" | "description">;

export type UpdateTodoDto = Partial<Pick<TodoDto, "name" | "description">>;

export type UpdateTodoStatusDto = Pick<TodoDto, "status">;
