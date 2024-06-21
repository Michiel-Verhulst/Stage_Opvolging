"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import Overview from "@/components/overviews/user-overview";
import mentorService from "@/lib/mentorService";
import { useEffect, useState } from "react";

export default function page() {
  const [mentorList, setMentorList] = useState<any>([]);
  const t = useTranslation();
  useEffect(() => {
    (async () => {
      const data = await mentorService.getMentors();
      setMentorList(data);
    })();
  }, []);

  return (
    <>
      <Overview
        inputData={mentorList}
        title={t("mentors_overview_title")}
        description={t("mentors_overview_description")}
      />
    </>
  );
}
