"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import opoService from "@/lib/opoService";
import { TOpo } from "@/types/opo.type"; // Adjust the path accordingly
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditOpo() {
  const router = useRouter();
  const opoCode = useSearchParams()?.get("opoCode");
  const [opoData, setOpoData] = useState<TOpo>();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    studyCode: "",
    loops: 1,
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching OPO data for study code:", opoCode);
        if (opoCode) {
          const response = await opoService.getOpo(opoCode);
          setOpoData(response.data);
          setFormData({
            code: response.data.code,
            name: response.data.name,
            studyCode: response.data.studyCode,
            loops: response.data.loops,
          });
          console.log("OPO data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching opo data:", error);
      }
    };

    fetchData();
  }, [opoCode]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleEdit = async () => {
    try {
      if (opoData) {
        const editedOpoData = {
          code: formData.code,
          name: formData.name,
          studyCode: formData.studyCode,
          loops: formData.loops,
        };

        await opoService.editOpo(editedOpoData, opoData.code);
        router.push("/opos");
      }
    } catch (error) {
      setErrors(["Something went wrong. Please try again."]);
      console.error("Error updating OPO:", error);
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
                  Edit OPO {formData.code}
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

                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  defaultValue={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <Label htmlFor="studyCode">Program Code</Label>
                <Input
                  type="text"
                  id="studyCode"
                  placeholder="Program Code (Ex.o000001)"
                  defaultValue={formData.studyCode}
                  onChange={(e) =>
                    handleInputChange("studyCode", e.target.value)
                  }
                />

                <Label htmlFor="loops">Number of Loops</Label>
                <select
                  id="loops"
                  value={formData.loops}
                  onChange={(e) =>
                    handleInputChange("loops", parseInt(e.target.value))
                  }
                  className="rounded-md border px-2 py-1"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <Button onClick={handleEdit} title="Submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditOpo;
