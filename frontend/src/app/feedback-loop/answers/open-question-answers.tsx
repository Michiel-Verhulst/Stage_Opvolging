import { useTranslation } from "@/components/language-toggle/useTranslation";
import { FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Control, useFieldArray } from "react-hook-form";
import { FormEntryValues } from "../form-questions-form";

export function OpenQuestionAnswers({
  questionIndex,
  control,
}: {
  questionIndex: number;
  control: Control<FormEntryValues>;
}) {
  const { data: session } = useSession();
  if (!session) return null;
  const user = session.user;

  const { fields: answers, append } = useFieldArray({
    control,
    name: `template.questions.${questionIndex}.answers`,
  });
  if (answers.find((answer) => answer.user?.role === user.role) === undefined) {
    append({
      answer: "",
      rating: null,
      user: {
        name: user.name!,
        role: user.role,
        email: user.email!,
        nummer: user.nummer,
        studyCode: null,
        secondNumber: null,
        birthDate: null,
        nationality: null,
      },
    });
  }
  const t = useTranslation();
  return (
    <>
      {answers.map((answer, answerIndex: number) =>
        answer.user?.nummer === user.nummer ? (
          <FormField
            control={control}
            key={"openquestionanswer" + answer.id}
            name={`template.questions.${questionIndex}.answers.${answerIndex}.answer`}
            render={({ field, fieldState }) => (
              <FormItem className="mb-2">
                {/*// @ts-ignore */}
                <Input
                  placeholder={
                    field.value?.length === 0 ? t("note") : field.value!
                  }
                  {...field}
                />
                <p className="text-sm text-destructive">
                  {fieldState.error?.message ?? ""}
                </p>
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={control}
            key={"ratingquestionanswer" + answer.id}
            name={`template.questions.${questionIndex}.answers.${answerIndex}.rating`}
            render={({ field }) => (
              <FormItem className="mb-2">
                {answer.user?.name} answered {answer.answer}
              </FormItem>
            )}
          />
        )
      )}
    </>
  );
}
