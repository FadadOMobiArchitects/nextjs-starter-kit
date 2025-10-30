"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DashboardColumns: ColumnDef<DashboardUser>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block uppercase">Nom</span>
            <ArrowUpDown className="size-4" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const lastName: string = row.getValue("lastName");

      return <div className="font-medium pl-4">{lastName || "-"}</div>;
    },
  },

  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block uppercase">Prénom</span>
            <ArrowUpDown className="size-4" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName: string = row.getValue("firstName");

      return <div className="font-medium">{firstName || "-"}</div>;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-transparent pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block uppercase">Email</span>
            <ArrowUpDown className="size-4" />
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const email: string = row.getValue("email");

      return <div className="font-medium">{email || "-"}</div>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return <div className="font-medium">{createdAt || "-"}</div>;
    },
  },
];
