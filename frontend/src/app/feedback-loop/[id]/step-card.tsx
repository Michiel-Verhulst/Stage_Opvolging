import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { FormEntryValues, FormQuestionsForm } from "../form-questions-form";

export function StepCard({
  title,
  description,
  parentValue,
  setTab,
  data,
  formList,
  refetch,
}: {
  title: string;
  description: string;
  parentValue: string;
  setTab: (value: string) => void;
  data?: FormEntryValues;
  formList?: FormEntryValues[];
  refetch: () => Promise<any>;
}) {
  const goNextStep = () => {
    if (parentValue !== "step-7")
      setTab("step-" + (parseInt(parentValue.split("-")[1]) + 1));
  };

  useEffect(() => {
    if (parentValue === "step-7" && data !== undefined) formList?.push(data);
    // console.log(data);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <FormQuestionsForm
          goNextStep={goNextStep}
          data={parentValue !== "step-7" ? data : undefined}
          formList={formList}
          refetch={refetch}
        />
      </CardContent>
    </Card>
  );
}
