import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addGuestTodo,
  removeGuestTodo,
  selectGuestTodos,
} from "../features/guest/guestTodosSlice";

export default function Home() {
  const [taskName, setTaskName] = useState("");
  const dispatch = useAppDispatch();
  const guestTodos = useAppSelector(selectGuestTodos);

  const handleAdd = () => {
    if (!taskName.trim()) return;
    dispatch(addGuestTodo({ name: taskName.trim() }));
    setTaskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-lg-7 col-md-9">
        {/* Welcome section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2">
            <i className="pi pi-check-square me-2" />
            Get Things Done
          </h1>
          <p className="text-muted fs-5">
            Start adding your tasks — no account needed.
          </p>
        </div>

        {/* Add task input */}
        <div className="d-flex gap-2 mb-4">
          <InputText
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What do you need to do?"
            className="flex-grow-1"
          />
          <Button
            icon="pi pi-plus"
            label="Add"
            className="rounded-pill"
            onClick={handleAdd}
            disabled={!taskName.trim()}
          />
        </div>

        {/* Task list */}
        {guestTodos.length === 0 ? (
          <div className="text-center py-5" style={{ opacity: 0.5 }}>
            <i
              className="pi pi-inbox d-block mb-2"
              style={{ fontSize: "2.5rem" }}
            />
            <p className="mb-0">No tasks yet. Add your first one above!</p>
          </div>
        ) : (
          <ul className="list-group">
            {guestTodos.map((todo) => (
              <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{todo.name}</span>
                <Button
                  icon="pi pi-times"
                  text
                  rounded
                  severity="danger"
                  size="small"
                  onClick={() => dispatch(removeGuestTodo(todo.id))}
                  aria-label="Remove"
                />
              </li>
            ))}
          </ul>
        )}

        {/* Hint */}
        {guestTodos.length > 0 && (
          <p
            className="text-muted text-center mt-3"
            style={{ fontSize: "0.85rem" }}
          >
            <i className="pi pi-info-circle me-1" />
            Sign up to save your tasks and access them anywhere.
          </p>
        )}
      </div>
    </div>
  );
}
