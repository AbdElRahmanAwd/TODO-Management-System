import { useState } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodoStatusMutation,
  useDeleteTodoMutation,
} from "../api/todosApi";
import type { Todo, TodoStatus } from "../types/todo.type";
import TaskList from "../features/tasks/TaskList";
import TaskFormDialog from "../features/tasks/TaskFormDialog";
import type { TaskFormValues } from "../features/tasks/TaskFormDialog";

export default function Tasks() {
  const { data: todos = [], isLoading, isError } = useGetTodosQuery();
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [updateTodoStatus] = useUpdateTodoStatusMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const [showCreate, setShowCreate] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleCreate = async (values: TaskFormValues) => {
    await createTodo(values).unwrap();
    setShowCreate(false);
  };

  const handleEdit = async (values: TaskFormValues) => {
    if (!editingTodo) return;

    await updateTodo({ id: editingTodo.id, data: values }).unwrap();
    setEditingTodo(null);
  };

  const handleStatusChange = async (todo: Todo, status: TodoStatus) => {
    await updateTodoStatus({ id: todo.id, data: { status } }).unwrap();
  };

  const handleDelete = (todo: Todo) => {
    confirmDialog({
      message: `Delete "${todo.name}"? This cannot be undone.`,
      header: "Confirm Delete",
      icon: "pi pi-trash",
      acceptClassName: "p-button-danger",
      accept: async () => {
        await deleteTodo(todo.id).unwrap();
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

        <TaskList
          todos={todos}
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
    </div>
  );
}
