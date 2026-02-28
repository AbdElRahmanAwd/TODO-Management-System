export interface Entity {
  id: number;
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type statusConfig = {
  label: string;
  severity: "info" | "warning" | "success" | "danger" | null;
  value: string;
  color: string;
  icon: React.ReactNode;
};
