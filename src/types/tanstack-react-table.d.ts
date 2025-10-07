import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    headerClassName?: string;
    cellClassName?: string;
  }
}

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends Record<string, unknown>> {
    refetch?: () => void;
    // Using 'any' type to handle all possible ID formats from endpoints
    remove?: (id: any) => Promise<void>;
    edit?: (id: number, data: any) => Promise<any>;
  }
}
