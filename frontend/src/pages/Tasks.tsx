import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
} from "../api/todosApi";
import { TodoStatus } from "../types/todo.type";
import type { Todo } from "../types/todo.type";
import { TODO_STATUS_CONFIG } from "../config/common/todoStatus";
import TaskList from "../features/tasks/TaskList";
import TaskFormDialog from "../features/tasks/TaskFormDialog";
import type { TaskFormValues } from "../features/tasks/TaskFormDialog";
import { Toast } from "primereact/toast";

const FILTER_OPTIONS = [
  { label: "All", value: null },
  ...Object.values(TODO_STATUS_CONFIG).map((c) => ({
    label: c.label,
    value: c.value,
  })),
];

export default function Tasks() {
  const { data: todos = [], isLoading, isError } = useGetTodosQuery();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [updateTodoStatus] = useUpdateTodoStatusMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const toast = useRef<Toast>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<TodoStatus | null>(null);

  const filteredTodos = statusFilter
    ? todos.filter((t) => t.status === statusFilter)
    : todos;

  const handleCreate = async (values: TaskFormValues) => {
    await createTodo(values).unwrap();
    setShowCreate(false);
  };

  const handleEdit = async (values: TaskFormValues) => {
    if (!editingTodo) return;

    await updateTodo({ id: editingTodo.id, data: values }).unwrap();
    setEditingTodo(null);
    toast.current?.show({
      severity: "success",
      summary: "Task Updated",
      style: { width: "fit-content", marginTop: "3rem" },
      closable: false,
    });
  };

  const handleStatusChange = async (todo: Todo, status: TodoStatus) => {
    await updateTodoStatus({ id: todo.id, data: { status } }).unwrap();
    toast.current?.show({
      severity: status === TodoStatus.COMPLETED ? "success" : "info",
      summary: `Task marked as ${TODO_STATUS_CONFIG[status].label}`,
      style: { width: "fit-content", marginTop: "3rem" },
      closable: false,
    });
  };

  const handleDelete = (todo: Todo) => {
    confirmDialog({
      message: `Delete "${todo.name}"? This cannot be undone.`,
      header: "Confirm Delete",
      icon: "pi pi-trash",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await deleteTodo(todo.id).unwrap();
        toast.current?.show({
          severity: "success",
          summary: "Task Deleted",
          style: { width: "fit-content", marginTop: "3rem" },
          closable: false,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="4"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-5">
        <i
          className="pi pi-exclamation-triangle d-block mb-3"
          style={{ fontSize: "2.5rem", color: "var(--app-danger)" }}
        />
        <p className="fs-5">Failed to load tasks. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="row justify-content-center mt-2">
      <div className="col-lg-8 col-md-10">
        <ConfirmDialog />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            <i className="pi pi-list-check me-2" />
            My Tasks
          </h2>
          <Button
            icon="pi pi-plus"
            label="New Task"
            className="rounded-pill"
            size="small"
            onClick={() => setShowCreate(true)}
          />
        </div>

        <div className="mb-3">
          <SelectButton
            value={statusFilter}
            options={FILTER_OPTIONS}
            onChange={(e) => setStatusFilter(e.value as TodoStatus | null)}
            allowEmpty={false}
          />
        </div>

        <TaskList
          todos={filteredTodos}
          onEdit={setEditingTodo}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />

        <TaskFormDialog
          mode="create"
          visible={showCreate}
          onHide={() => setShowCreate(false)}
          onSubmit={handleCreate}
          loading={isCreating}
        />

        <TaskFormDialog
          mode="edit"
          visible={!!editingTodo}
          onHide={() => setEditingTodo(null)}
          onSubmit={handleEdit}
          initialValues={
            editingTodo
              ? { name: editingTodo.name, description: editingTodo.description }
              : undefined
          }
          loading={isUpdating}
        />
      </div>

      <Toast ref={toast} position="top-left" />
    </div>
  );
}
