import type { statusConfig } from "../../types/common.type";
import { TodoStatus } from "../../types/todo.type";

export const TODO_STATUS_CONFIG: Record<TodoStatus, statusConfig> = {
  [TodoStatus.TODO]: {
    label: "To Do",
    severity: "info",
    value: TodoStatus.TODO,
    color: "var(--app-info)",
    icon: "pi pi-clock",
  },
  [TodoStatus.IN_PROGRESS]: {
    label: "In Progress",
    severity: "warning",
    value: TodoStatus.IN_PROGRESS,
    color: "var(--app-warning)",
    icon: "pi pi-spinner",
  },
  [TodoStatus.COMPLETED]: {
    label: "Completed",
    severity: "success",
    value: TodoStatus.COMPLETED,
    color: "var(--app-success)",
    icon: "pi pi-check",
  },
};
