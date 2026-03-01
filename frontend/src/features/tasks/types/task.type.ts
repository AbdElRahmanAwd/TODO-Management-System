import type { Todo, TodoStatus } from "../../../types/todo.type";

export interface TaskProps {
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (todo: Todo, status: TodoStatus) => void;
}
