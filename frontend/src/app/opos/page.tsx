"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import Overview from "@/components/overviews/opo-overview";
import opoService from "@/lib/opoService";
import { useEffect, useState } from "react";

export default function Page() {
  const [opoList, setOpoList] = useState<any>([]);
  const t = useTranslation();
  useEffect(() => {
    (async () => {
      const opos = await opoService.getOpos();
      setOpoList(opos);
    })();
  }, []);

  return (
    <>
      <Overview
        inputData={opoList}
        title={t("OPOs")}
        description={t("opos_description")}
      />
    </>
  );
}
