import { useTranslation } from "@/components/language-toggle/useTranslation";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { Control, useFieldArray } from "react-hook-form";
import { FormEntryValues } from "../form-questions-form";

export function RatingAnswers({
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
      answer: null,
      rating: 0,
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
            key={"ratingquestionanswer" + answer.id}
            name={`template.questions.${questionIndex}.answers.${answerIndex}.rating`}
            render={({ field, fieldState }) => (
              <FormItem className="mb-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={
                    field?.value?.toString() === "0"
                      ? ""
                      : field?.value?.toString()
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("select_rating")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
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
                {answer.user?.name} {t("selected")} {answer.rating}
              </FormItem>
            )}
          />
        )
      )}
    </>
  );
}
