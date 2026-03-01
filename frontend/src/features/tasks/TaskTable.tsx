import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import PDataTable from "../../components/Ui/PDataTable";
import type { Todo } from "../../types/todo.type";
import { TodoStatus } from "../../types/todo.type";
import { TODO_STATUS_CONFIG } from "../../config/common/todoStatus";
import type { TaskProps } from "./types/task.type";
import { getNextStatus } from "../../utils/status";

interface TaskTableProps extends TaskProps {
  todos: Todo[];
  loading: boolean;
}

export default function TaskTable({
  todos,
  onEdit,
  onDelete,
  onStatusChange,
  loading,
}: TaskTableProps) {
  return (
    <PDataTable
      data={todos}
      loading={loading}
      columns={[
        {
          field: "name",
          header: "Name",
          sortable: true,
          style: { minWidth: "180px" },
        },
        {
          field: "description",
          header: "Description",
          style: { minWidth: "220px" },
          body: (row: Todo) => (
            <span className="text-muted">{row.description || "—"}</span>
          ),
        },
        {
          header: "Status",
          style: { minWidth: "130px" },
          body: (row: Todo) => {
            const cfg = TODO_STATUS_CONFIG[row.status];
            return (
              <Tag
                value={cfg.label}
                severity={cfg.severity}
                icon={cfg.icon as string}
                rounded
              />
            );
          },
        },
        {
          header: "Actions",
          style: { minWidth: "140px" },
          body: (row: Todo) => {
            const isCompleted = row.status === TodoStatus.COMPLETED;
            const nextStatus = getNextStatus(row.status);
            const nextLabel = TODO_STATUS_CONFIG[nextStatus].label;
            return (
              <div className="d-flex gap-1">
                <Button
                  icon="pi pi-sync"
                  text
                  rounded
                  severity="secondary"
                  size="small"
                  hidden={isCompleted}
                  tooltip={`Mark as ${nextLabel}`}
                  tooltipOptions={{ position: "top" }}
                  onClick={() => onStatusChange(row, nextStatus)}
                />
                <Button
                  icon="pi pi-pencil"
                  text
                  rounded
                  severity="info"
                  size="small"
                  tooltip="Edit"
                  tooltipOptions={{ position: "top" }}
                  onClick={() => onEdit(row)}
                />
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  severity="danger"
                  size="small"
                  tooltip="Delete"
                  tooltipOptions={{ position: "top" }}
                  onClick={() => onDelete(row)}
                />
              </div>
            );
          },
        },
      ]}
    />
  );
}
