import { Todo } from "../../entities/todo.entity";
import { TodoStatus } from "../../enums/todo-status.enum";

export interface ITodoRepository {
  findAll(userId: number): Promise<Todo[]>;
  findById(id: number, userId: number): Promise<Todo | null>;
  create(
    data: Pick<Todo, "name" | "description">,
    userId: number,
  ): Promise<Todo>;
  update(
    id: number,
    data: Partial<Pick<Todo, "name" | "description">>,
    userId: number,
  ): Promise<Todo | null>;
  updateStatus(
    id: number,
    status: TodoStatus,
    userId: number,
  ): Promise<Todo | null>;
  delete(id: number, userId: number): Promise<boolean>;
}
