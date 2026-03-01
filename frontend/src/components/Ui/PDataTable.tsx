import { DataTable, type DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";

interface ColumnDef<T> {
  field?: string;
  header: string;
  sortable?: boolean;
  style?: React.CSSProperties;
  body?: (rowData: T) => React.ReactNode;
}

interface IPDataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  size?: "small" | "normal" | "large";
  style?: React.CSSProperties;
  className?: string;
  showGridlines?: boolean;
  stripedRows?: boolean;
  pagination?: boolean;
  rowsPerPageOptions?: number[];
  rows?: number;
  loading?: boolean;
}

export default function PDataTable<T extends DataTableValue>({
  data,
  columns,
  size = "normal",
  style,
  className,
  showGridlines = false,
  stripedRows = true,
  pagination = false,
  rowsPerPageOptions,
  rows,
  loading = false,
}: IPDataTableProps<T>) {
  return (
    <DataTable
      value={data}
      size={size}
      tableStyle={style}
      className={className}
      showGridlines={showGridlines}
      stripedRows={stripedRows}
      paginator={pagination}
      rows={rows}
      rowsPerPageOptions={rowsPerPageOptions}
      loading={loading}
      emptyMessage="No tasks found."
    >
      {columns.map((column, i) => (
        <Column
          key={column.field ?? i}
          field={column.field}
          header={column.header}
          sortable={column.sortable}
          style={column.style}
          body={column.body}
        />
      ))}
    </DataTable>
  );
}
