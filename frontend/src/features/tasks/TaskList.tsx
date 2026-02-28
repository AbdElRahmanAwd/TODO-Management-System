import type { Todo } from "../../types/todo.type";
import type { TodoStatus } from "../../types/todo.type";
import TaskCard from "./TaskCard";

interface TaskListProps {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (todo: Todo, status: TodoStatus) => void;
}

export default function TaskList({
  todos,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-5" style={{ opacity: 0.5 }}>
        <i
          className="pi pi-inbox d-block mb-2"
          style={{ fontSize: "2.5rem" }}
        />
        <p className="mb-0 fs-5">No tasks yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {todos.map((todo) => (
        <TaskCard
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

