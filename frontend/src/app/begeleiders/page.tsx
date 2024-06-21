"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import Overview from "@/components/overviews/user-overview";
import begeleiderService from "@/lib/begeleiderService";
import { TUser } from "@/types/user.type";
import { useEffect, useState } from "react";

export default function Page() {
  const [begeleiderList, setBegeleiderList] = useState<TUser[]>([]);
  const t = useTranslation();

  useEffect(() => {
    (async () => {
      const data = await begeleiderService.getBegeleiders();
      setBegeleiderList(data);
    })();
  }, []);

  return (
    <Overview
      inputData={begeleiderList}
      title={t("coaches_overview_title")}
      description={t("coaches_overview_description")}
    />
  );
}
