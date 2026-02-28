import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { TodoStatus } from "../../types/todo.type";
import type { Todo } from "../../types/todo.type";
import { TODO_STATUS_CONFIG } from "../../config/common/todoStatus";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { format } from "date-fns";

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
  const [visibleSidebar, setVisibleSidebar] = useState(false);

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
              cursor: "pointer",
            }}
            onClick={() => setVisibleSidebar(true)}
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

      <Sidebar
        visible={visibleSidebar}
        position="right"
        onHide={() => setVisibleSidebar(false)}
        className="w-full md:w-30rem lg:w-70rem"
      >
        <h2 className="fw-bold mb-4">{todo.name}</h2>

        <div className="d-flex flex-column gap-3">
          <div>
            <label className="text-muted small d-block mb-1">Status</label>
            <Tag
              value={statusConfig.label}
              severity={statusConfig.severity}
              icon={statusConfig.icon as string}
              rounded
            />
          </div>

          <div>
            <label className="text-muted small d-block mb-1">Description</label>
            <p className="mb-0">
              {todo.description || "No description provided."}
            </p>
          </div>

          <div>
            <label className="text-muted small d-block mb-1">Created</label>
            <p className="mb-0">
              {format(new Date(todo.createdAt), "MMMM d, yyyy 'at' hh:mm a")}
            </p>
          </div>

          <div>
            <label className="text-muted small d-block mb-1">
              Last Updated
            </label>
            <p className="mb-0">
              {format(new Date(todo.updatedAt), "MMMM d, yyyy 'at' hh:mm a")}
            </p>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
