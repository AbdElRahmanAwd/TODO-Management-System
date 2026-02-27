import { Todo } from "../entities/todo.entity";
import { TodoStatus } from "../enums/todo-status.enum";

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: number): Promise<Todo | null>;
  create(data: Pick<Todo, "name" | "description">): Promise<Todo>;
  update(
    id: number,
    data: Partial<Pick<Todo, "name" | "description">>,
  ): Promise<Todo | null>;
  updateStatus(id: number, status: TodoStatus): Promise<Todo | null>;
  delete(id: number): Promise<boolean>;
}
