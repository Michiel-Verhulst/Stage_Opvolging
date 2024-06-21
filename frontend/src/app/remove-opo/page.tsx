"use client";

import { Button } from "@/components/ui/button";
import opoService from "@/lib/opoService";
import { TOpo } from "@/types/opo.type";
import Link from "next/link"; // Adjust the path accordingly
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function RemoveOpo() {
  const router = useRouter();
  const opoCode = useSearchParams()?.get("opoCode");
  const [opoData, setOpoData] = useState<TOpo>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching OPO data for study code:", opoCode);
        if (opoCode) {
          const response = await opoService.getOpo(opoCode);
          setOpoData(response.data);
          console.log("OPO data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching opo data:", error);
      }
    };

    fetchData();
  }, [opoCode]);

  const handleDelete = async () => {
    try {
      if (opoData) {
        await opoService.removeOpo(opoData.code);
        router.push("/opos");
      }
    } catch (error) {
      setErrors(["Something went wrong. Please try again."]);
      console.error("Error deleting OPO:", error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mt-6 w-full max-w-full flex-none px-3">
          <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
            <div className="flex items-center justify-between space-y-2">
              <div className="grid w-full max-w-md items-center gap-1.5">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">
                  Remove OPO
                </h2>
                {errors.length > 0 && (
                  <div
                    className="relative rounded border border-red-400 bg-red-100 py-3 pl-4 pr-10 text-red-700"
                    role="alert"
                  >
                    <strong className="font-bold">Oops! </strong>
                    {errors.map((error, key) => (
                      <span key={key} className="block sm:inline">
                        {key > 0 && ", "}
                        {error}
                      </span>
                    ))}
                    <span className="absolute bottom-0 right-0 top-0 px-4 py-3">
                      <svg
                        className="h-6 w-6 fill-current text-red-500"
                        role="button"
                        onClick={() => setErrors([])}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                )}
                {opoData && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <p>Code: {opoData.code}</p>
                    <p>Name: {opoData.name}</p>
                    <p>Program Code: {opoData.studyCode}</p>
                    <p>Loops: {opoData.loops}</p>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <Button onClick={handleDelete}>Delete</Button>
                      <div style={{ marginLeft: "8px" }}>
                        <button className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                          <Link href={"/opos"}>Back</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveOpo;
