import { columns } from "@/components/tables/user-columns";
import { DataTable } from "@/components/tables/data-table";
import { useTranslation } from "@/components/language-toggle/useTranslation";

export default function Overview({
  inputData = [],
  title = "Students",
  description = "Here is the list of all students!",
}: {
  inputData: any[];
  title: string;
  description: string;
}) {
  const t = useTranslation();
  const columns2 = columns(t);
  return (
    <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-8">
      <div className=" w-full max-w-full flex-none px-3">
        <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
          <DataTable columns={columns2} data={inputData} />
        </div>
      </div>
    </div>
  );
}
