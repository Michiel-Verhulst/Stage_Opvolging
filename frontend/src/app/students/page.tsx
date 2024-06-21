"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import Overview from "@/components/overviews/user-overview";
import studentService from "@/lib/studentService";
import { useEffect, useState } from "react";

export default function Page() {
  const [studentList, setStudentList] = useState<any>([]);
  const t = useTranslation();
  useEffect(() => {
    (async () => {
      const data = await studentService.getStudents();
      setStudentList(data);
    })();
  }, []);

  return (
    <>
      <Overview
        inputData={studentList}
        title={t("students_overview_title")}
        description={t("students_overview_description")}
      />
    </>
  );
}
