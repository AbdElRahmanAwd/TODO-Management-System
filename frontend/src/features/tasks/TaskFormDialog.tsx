import { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

export interface TaskFormValues {
  name: string;
  description?: string;
}

interface TaskFormDialogProps {
  mode: "create" | "edit";
  visible: boolean;
  onHide: () => void;
  onSubmit: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
  loading?: boolean;
}

export default function TaskFormDialog({
  mode,
  visible,
  onHide,
  onSubmit,
  initialValues,
  loading = false,
}: TaskFormDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (visible) {
      setName(initialValues?.name ?? "");
      setDescription(initialValues?.description ?? "");
    }
  }, [visible, initialValues]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
    });
  };

  const isCreate = mode === "create";

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={isCreate ? "New Task" : "Edit Task"}
      style={{ width: "480px" }}
      modal
      dismissableMask
      draggable={false}
    >
      <div className="d-flex flex-column gap-3 mt-2">
        <div>
          <label htmlFor="task-name" className="form-label fw-semibold">
            Name
          </label>
          <InputText
            id="task-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name"
            className="w-100"
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="task-desc" className="form-label fw-semibold">
            Description <span className="text-muted fw-normal">(optional)</span>
          </label>
          <InputTextarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details..."
            className="w-100"
            rows={3}
            autoResize
          />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <Button
            label="Cancel"
            severity="secondary"
            text
            size="small"
            className="rounded-pill"
            onClick={onHide}
          />
          <Button
            label={isCreate ? "Create" : "Save"}
            icon="pi pi-check"
            size="small"
            className="rounded-pill"
            loading={loading}
            disabled={!name.trim()}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Dialog>
  );
}
