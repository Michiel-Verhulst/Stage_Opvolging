"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TOpo } from "@/types/opo.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

export const opo_columns = (t: any): ColumnDef<Partial<TOpo>>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: t("code"),
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },
  {
    accessorKey: "name",
    header: t("name"),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "studyCode",
    header: t("program_code"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("studyCode")}</div>
    ),
  },
  {
    accessorKey: "loops",
    header: t("loops"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("loops")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const t = useTranslation();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lowercase hover:text-primary">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button>
                <Link href={"/edit-opo?opoCode=" + row.getValue("code")}>
                  {t("edit")}
                </Link>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button>
                <Link href={"/remove-opo?opoCode=" + row.getValue("code")}>
                  {t("delete")}
                </Link>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
