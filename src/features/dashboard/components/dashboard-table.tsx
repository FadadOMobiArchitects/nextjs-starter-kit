"use client";

import { useState } from "react";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ReusableTable } from "@/components/table/reusable-data-table";
import { caseInsensitiveText } from "@/utils/table-column-sort";

export function DashboardTable<TData, TValue>({
  data,
  columns,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    manualPagination: true,

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    onRowSelectionChange: setRowSelection,

    // Register custom sorting function(s)
    sortingFns: {
      caseInsensitive: caseInsensitiveText,
    },
    // Apply to every column unless that column sets its own sortingFn
    defaultColumn: {
      // Cast to any to satisfy generic constraint; the key exists in sortingFns above
      sortingFn: "caseInsensitive" as any,
    },

    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <>
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center items-start justify-between gap-4 w-full">
        <h3 className="text-xl font-semibold uppercase">
          Liste des utilisateurs
        </h3>

        <div className="grid sm:grid-cols-2 gap-2 items-center"></div>
      </div>

      <ReusableTable
        className="bg-white rounded-md border"
        table={table}
        columns={columns}
        emptyMessage="Aucun home enregistré."
      />
    </>
  );
}
