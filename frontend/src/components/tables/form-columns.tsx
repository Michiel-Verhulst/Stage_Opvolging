"use client";
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
import { TForm } from "@/types/form.type";
import { TOpo } from "@/types/opo.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "../language-toggle/useTranslation";

export const form_columns = (t: any): ColumnDef<Partial<TForm>>[] => [
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
    accessorKey: "title",
    header: t("title"),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "opo",
    header: t("opo_code"),
    cell: ({ row }) => {
      let opo = row.getValue("opo") as TOpo;
      return <div className="capitalize">{opo.code}</div>;
    },
  },
  {
    accessorKey: "opo",
    header: t("program_code"),
    cell: ({ row }) => {
      let opo = row.getValue("opo") as TOpo;
      return <div className="capitalize">{opo.studyCode}</div>;
    },
  },
  {
    accessorKey: "type",
    header: t("type"),
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const form = row.original;
      const t = useTranslation();
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lowercase hover:text-primary">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.nummer || "")}
                        >
                            Copy R-nummer
                        </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="w-full" href={`forms/${form.id}`}>
                {t("edit")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button>
                <Link href={`delete-form/${form.id}`}>{t("delete")}</Link>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
