import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { useTranslation } from "../language-toggle/useTranslation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const t = useTranslation();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="mt-10">
      <div className="rounded-md border">
        <TableHead className="w-screen">
          <TableRow className="flex">
            <TableCell className="flex-1" />
            <TableCell className="flex-1">{t("code")}</TableCell>
            <TableCell className="flex-1">{t("name")}</TableCell>
            <TableCell className="flex-1">{t("program_code")}</TableCell>
            <TableCell className="flex-1">{t("loops")}</TableCell>
            <TableCell className="flex-1" />
          </TableRow>
        </TableHead>
        <Table>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div className="overflow-hidden">
                  <Accordion type="single" className="p-4" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0">
                        <TableRow
                          style={{ border: "none" }}
                          className="flex w-full"
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell className="flex-1" key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Table>
                          <TableBody>
                            <TableRow>
                              {/*Temporary fix (Empty TableHead)! if we have still time, try to fix this */}
                              <TableHead></TableHead>
                              <TableHead>ID</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Type</TableHead>
                            </TableRow>
                            {
                              // @ts-ignore
                              row.original.templates.map((template) => (
                                <TableRow>
                                  {/*Temporary fix (Empty TableCell)! if we have still time, try to fix this */}
                                  <TableCell></TableCell>
                                  {Object.keys(template)
                                    .filter((key) => key !== "questions") // Exclude 'questions' field
                                    .map((key) => (
                                      <TableCell key={key}>
                                        {template[key]}
                                      </TableCell>
                                    ))}
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} -{" "}
          {table.getFilteredRowModel().rows.length} {t("rows")}.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t("previous")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
