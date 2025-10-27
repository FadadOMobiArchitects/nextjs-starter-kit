"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<any>[] = [
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
      const lastName = row.getValue("lastName") as string;

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
      const firstName = row.getValue("firstName") as string;

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
      const email = row.getValue("email") as string;

      return <div className="font-medium">{email || "-"}</div>;
    },
  },

  {
    accessorKey: "roleName",
    header: "Rôle",
    cell: ({ row }) => {
      const roleName = row.getValue("roleName") as string;

      return <div className="font-medium">{roleName || "-"}</div>;
    },
  },

  {
    accessorKey: "clientName",
    header: "Client",
    cell: ({ row }) => {
      const clientName = row.getValue("clientName") as string;

      return <div className="font-medium">{clientName || "-"}</div>;
    },
  },
];
