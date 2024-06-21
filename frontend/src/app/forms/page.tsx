"use client";
import Form_overview from "@/components/overviews/form-overview";
import { useEffect, useState } from "react";
import { getForms } from "@/lib/formService";
import { useTranslation } from "@/components/language-toggle/useTranslation";

export default function Page() {
  const [formList, setFormList] = useState<any>([]);
  const t = useTranslation();
  useEffect(() => {
    (async () => {
      const data = await getForms();
      setFormList(data);
    })();
  }, []);

  return (
    <>
      <Form_overview
        inputData={formList}
        title={t("forms_overview_title")}
        description={t("forms_overview_description")}
      />
    </>
  );
}
