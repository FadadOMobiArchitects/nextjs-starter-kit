"use client";

import { cn } from "@/lib/utils";
import {
  flexRender,
  Table as TanStackTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type ReusableTableProps<TData> = {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData>[];
  loading?: boolean;
  pageSize?: number;
  searchKeyword?: string;
  emptyMessage?: string;
  searchEmptyMessage?: string;
  className?: string;
};

export function ReusableTable<TData>({
  table,
  columns,
  loading = false,
  pageSize = 10,
  searchKeyword = "",
  emptyMessage = "Aucun résultat.",
  searchEmptyMessage,
  className = "",
}: Readonly<ReusableTableProps<TData>>) {
  return (
    <div className={className}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "text-muted-foreground font-normal text-[13px] uppercase",
                      header.column.columnDef.meta?.headerClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {(() => {
            if (loading) {
              // Loading skeleton
              return Array.from({ length: pageSize }, (_, index) => index).map(
                (index) => (
                  <TableRow key={`loading-skeleton-${pageSize}-${index}`}>
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={`skeleton-cell-${index}-${colIndex}`}
                        className="py-3.5"
                      >
                        <Skeleton className="h-4 w-full rounded-xs" />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              );
            }

            if (table.getRowModel().rows?.length) {
              // Data rows
              return table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "py-3.5 font-medium",
                        cell.column.columnDef.meta?.cellClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ));
            }

            // Empty state
            return (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {searchKeyword
                    ? searchEmptyMessage ||
                      `Aucun résultat pour "${searchKeyword}"`
                    : emptyMessage}
                </TableCell>
              </TableRow>
            );
          })()}
        </TableBody>
      </Table>
    </div>
  );
}
