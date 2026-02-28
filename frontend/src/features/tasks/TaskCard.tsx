import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { TodoStatus } from "../../types/todo.type";
import type { Todo } from "../../types/todo.type";
import { TODO_STATUS_CONFIG } from "../../config/common/todoStatus";

const STATUS_CYCLE: TodoStatus[] = [
  TodoStatus.TODO,
  TodoStatus.IN_PROGRESS,
  TodoStatus.COMPLETED,
];

function getNextStatus(current: TodoStatus): TodoStatus {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
}

interface TaskCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (todo: Todo, status: TodoStatus) => void;
}

export default function TaskCard({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const isCompleted = todo.status === TodoStatus.COMPLETED;
  const statusConfig = TODO_STATUS_CONFIG[todo.status];
  const nextStatus = getNextStatus(todo.status);
  const nextLabel = TODO_STATUS_CONFIG[nextStatus].label;

  return (
    <div
      className="border rounded-3 p-3 d-flex align-items-center gap-3"
      style={{
        backgroundColor: "var(--app-surface)",
        borderColor: "var(--app-border)",
      }}
    >
      <div className="flex-grow-1 min-w-0">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span
            className="fw-semibold text-truncate"
            style={{
              textDecoration: isCompleted ? "line-through" : "none",
              opacity: isCompleted ? 0.6 : 1,
            }}
          >
            {todo.name}
          </span>
          <Tag
            value={statusConfig.label}
            severity={statusConfig.severity}
            icon={statusConfig.icon as string}
            rounded
          />
        </div>
        {todo.description && (
          <p className="mb-0 text-muted small mt-1">{todo.description}</p>
        )}
      </div>

      <div className="d-flex gap-1 flex-shrink-0">
        <Button
          icon="pi pi-sync"
          text
          rounded
          severity="secondary"
          size="small"
          tooltip={`Mark as ${nextLabel}`}
          tooltipOptions={{ position: "top" }}
          onClick={() => onStatusChange(todo, nextStatus)}
        />
        <Button
          icon="pi pi-pencil"
          text
          rounded
          severity="info"
          size="small"
          tooltip="Edit"
          tooltipOptions={{ position: "top" }}
          onClick={() => onEdit(todo)}
        />
        <Button
          icon="pi pi-trash"
          text
          rounded
          severity="danger"
          size="small"
          tooltip="Delete"
          tooltipOptions={{ position: "top" }}
          onClick={() => onDelete(todo)}
        />
      </div>
    </div>
  );
}
