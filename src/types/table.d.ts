type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  page?: number;
  size?: number;
};

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

type DataTableColumnHeaderProps<TData, TValue> =
  HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };

type DynamicFacetedFilterProps<TData> = {
  table: Table<TData>;
  columnId: string;
  title: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  className?: string;
};
