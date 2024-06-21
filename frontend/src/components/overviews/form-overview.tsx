import { DataTable } from "@/components/tables/form-table";
import { form_columns } from "../tables/form-columns";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTranslation } from "@/components/language-toggle/useTranslation";

export default function FormOverview({
  inputData = [],
  title = "Forms",
  description = "Here is the list of all forms!",
}: {
  inputData: any[];
  title: string;
  description: string;
}) {
  const t = useTranslation();
  const columns = form_columns(t);
  return (
    <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-8 ">
      <div className="w-full max-w-full flex-none px-3">
        <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <Button asChild>
              <Link href={"/create-form"}>{t("create_form")}</Link>
            </Button>
          </div>
          <DataTable columns={columns} data={inputData} />
        </div>
      </div>
    </div>
  );
}
