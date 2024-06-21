import { Roles } from "@/types/role.type";

export const tabsInfo = (t: any) => [
  {
    value: "step-1",
    label: t("input"),
    description: t("input_selfevaluation"),
    access: [Roles.STUDENT],
  },
  {
    value: "step-2",
    label: t("feedback"),
    description: t("feedback_zelfevaluatie"),
    access: [Roles.MENTOR],
  },
  {
    value: "step-3",
    label: t("feedback"),
    description: t("feedback_op_zelfevaluatie_student_en_mentor"),
    access: [Roles.COACH],
  },
  {
    value: "step-4",
    label: t("feedback"),
    description: t("zelfreflectie_op_feedback_zelfevaluatie_van_mentor"),
    access: [Roles.STUDENT],
  },
  {
    value: "step-5",
    label: t("feedback"),
    description: t("feedback"),
    access: [Roles.COACH],
  },
  {
    value: "step-6",
    label: t("Zelfreflectie"),
    description: t("zelfreflectie_op_feedback_zelfevaluatie_van_begeleider"),
    access: [Roles.STUDENT],
  },
  {
    value: "step-7",
    label: t("overzicht"),
    description: t("overzicht_van_alle_formulieren"),
    access: [Roles.STUDENT, Roles.COACH, Roles.COORDINATOR, Roles.MENTOR],
  },
];
