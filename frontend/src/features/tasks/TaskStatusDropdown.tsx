import { Dropdown } from "primereact/dropdown";
import { TodoStatus } from "../../types/todo.type";
import { TODO_STATUS_CONFIG } from "../../config/common/todoStatus";

interface TaskStatusDropdownProps {
  value: TodoStatus;
  onChange: (status: TodoStatus) => void;
}

export default function TaskStatusDropdown({
  value,
  onChange,
}: TaskStatusDropdownProps) {
  const STATUS_OPTIONS = TODO_STATUS_CONFIG
    ? Object.values(TODO_STATUS_CONFIG).map((config) => ({
        label: config.label,
        value: config.value,
      }))
    : [];

  const SELECTED_STATUS_CONFIG = TODO_STATUS_CONFIG[value].value;

  return (
    <Dropdown
      value={SELECTED_STATUS_CONFIG}
      options={STATUS_OPTIONS}
      onChange={(e) => onChange(e.value as TodoStatus)}
      style={{ minWidth: "140px" }}
    />
  );
}
