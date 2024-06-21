"use client";

import { useTranslation } from "@/components/language-toggle/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import opoService from "@/lib/opoService";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CreateOpoForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    studyCode: "",
    loops: 1, // Default value set to 1
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting form data:", formData);

      // Voer hier de API-oproep uit om een nieuwe OPO te creëren
      const createdOpo = await opoService.createOpo(formData);
      console.log("Created OPO:", createdOpo);
      router.push("/opos");

      // Voeg eventueel verdere logica toe na succesvolle creatie
    } catch (error: any) {
      setErrors(
        error.response.data
          ? Object.values(error.response.data)
          : ["Something went wrong. Please try again."]
      );
      console.error("Error creating OPO:", error);
    }
  };

  const t = useTranslation();
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mt-6 w-full max-w-full flex-none px-3">
          <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
            <div className="flex items-center justify-between space-y-2">
              <div className="grid w-full max-w-md items-center gap-1.5">
                <h2 className="mb-4 text-3xl font-bold tracking-tight">
                  {t("create_opo")}
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
                <Label htmlFor="code">{t("code")}</Label>
                <Input
                  type="text"
                  id="code"
                  placeholder="Code (Ex.MBI47H)"
                  onChange={(e) => handleInputChange("code", e.target.value)}
                />

                <Label htmlFor="name">{t("name")}</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />

                <Label htmlFor="studyCode">{t("program_code")}</Label>
                <Input
                  type="text"
                  id="studyCode"
                  placeholder="Program Code (Ex.o000001)"
                  onChange={(e) =>
                    handleInputChange("studyCode", e.target.value)
                  }
                />

                <Label htmlFor="loops">{t("number_loops")}</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("loops", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10).keys()].map((num) => (
                      <SelectItem key={num + 1} value={(num + 1).toString()}>
                        {num + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant={"default"} onClick={handleSubmit}>
                  {t("submit")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateOpoForm;
