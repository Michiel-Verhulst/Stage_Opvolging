"use client";
import { Button } from "@/components/ui/button";
import { getFormById } from "@/lib/formService";
import { TForm } from "@/types/form.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const disableForm = ({ params }: any) => {
  const [form, setForm] = useState<TForm>();
  const router = useRouter();

  const getForm = async () => {
    const formResponse = await getFormById(params.id);
    const formee = await formResponse.json();
    setForm(formee);
  };

  const handleDisable = async () => {
    try {
      console.log("disable");
      await disableForm(params.id);
      router.push("/forms");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <div className="m-10 flex items-center justify-center">
      <div className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Delete Form</h2>
        {form && (
          <div>
            <p className="mb-4 text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-500">{form.title}</span>?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleDisable}
                className="rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                onClick={() => router.back()}
                className="mr-2 bg-green-500 hover:bg-green-600"
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default disableForm;
