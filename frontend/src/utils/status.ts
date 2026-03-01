import { TodoStatus } from "../types/todo.type";

const STATUS_CYCLE: TodoStatus[] = [
  TodoStatus.TODO,
  TodoStatus.IN_PROGRESS,
  TodoStatus.COMPLETED,
];

export function getNextStatus(current: TodoStatus): TodoStatus {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}
