"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFormsByInternshipId } from "@/lib/formService";
import { Roles } from "@/types/role.type";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormEntryValues } from "../form-questions-form";
import { StepCard } from "./step-card";
import { tabsInfo } from "./tabsInfo";

export default function Page(params: any) {
  const [tab, setTab] = useState<string>("");
  type TabType = { value: string; label: string | JSX.Element }[];
  const [tabs, setTabs] = useState<TabType>([]);
  const [formEntryValues, setFormEntryValues] = useState<FormEntryValues>();
  const [formList, setFormlist] = useState<FormEntryValues[]>();

  //fetch forms
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["forms", params.params.id],
    queryFn: async () => {
      const response = await getFormsByInternshipId({
        internshipId: params.params.id,
      });
      if (response.code === "error") {
        throw new Error(response.error.message);
      }
      return response.data;
    },
  });
  console.log(data);
  //set formEntryValues
  useEffect(() => {
    if (isLoading) return;
    if (!data || data.length === 0) return;

    for (let i = 0; i < data.length; i++) {
      //if(forms[i] has no answers || forms[i] has only student answers) => return forms[i]
      if (
        data[i].template.questions.every(
          (question) =>
            question.answers.length === 0 ||
            question.answers.every(
              (answer) => answer?.user?.role === Roles.STUDENT
            ) ||
            (data[i].currentPhase === "PHASE3" &&
              question.answers.every(
                (answer) =>
                  answer?.user?.role == Roles.STUDENT ||
                  answer?.user?.role == Roles.MENTOR
              ))
        )
      ) {
        let listForm = [];
        for (let n = 0; n < i; n++) {
          listForm.push(data[n]);
        }
        setFormlist(listForm);
        setFormEntryValues(data[i]);
        break;
      }
    }
  }, [data]);

  //set tab after formEntryValues is set
  useEffect(() => {
    setTab("step-" + formEntryValues?.currentPhase.split("PHASE")[1]);
  }, [formEntryValues]);

  //set tabs with tab
  useEffect(() => {
    setTabs(
      Array.from({ length: 6 }, (_, i) => ({
        value: `step-${i + 1}`,
        label:
          Number(tab.split("-")[1]) <= i + 1 ? (
            `Step ${i + 1}`
          ) : (
            <CheckCheck height={20} />
          ),
      }))
    );
  }, [tab]);

  //need user role
  const { data: session } = useSession();
  if (!session) return;
  const userRole = session.user.role;
  const t = useTranslation();

  return (
    <div className="container">
      <div className="flex w-full justify-center">
        <div className="shadow-soft-xl relative mb-6 flex w-full min-w-0 max-w-4xl flex-col break-words rounded-2xl bg-card bg-clip-border p-10">
          <Tabs value={tab}>
            <TabsList className="grid w-full grid-cols-6">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabsInfo(t).map((tabData) =>
              tabData.access.some((user) => user == userRole) ? (
                <TabsContent key={tabData.value} value={tabData.value}>
                  <StepCard
                    parentValue={tabData.value}
                    title={tabData.label}
                    description={tabData.description}
                    setTab={setTab}
                    data={formEntryValues}
                    formList={formList}
                    refetch={refetch}
                  />
                </TabsContent>
              ) : (
                <TabsContent key={tabData.value} value={tabData.value}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("pending")}</CardTitle>
                      <CardDescription>
                        {t("wait")} {t(tabData.access[0]).toUpperCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2"></CardContent>
                  </Card>
                </TabsContent>
              )
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
