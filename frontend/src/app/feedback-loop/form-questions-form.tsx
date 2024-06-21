"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { addAnswer, updateFormPhase } from "@/lib/formService";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { BulletsQuestionAnswers } from "./answers/bullets-answers";
import { OpenQuestionAnswers } from "./answers/open-question-answers";
import { RatingAnswers } from "./answers/rating-answers";
import { TemplateSchema } from "./schemas/schemas";

export const FormEntrySchema = z.object({
  id: z.number(),
  creationDate: z.string(),
  updateDate: z.string(),
  currentPhase: z.string(),
  template: TemplateSchema,
});

export type FormEntryValues = z.infer<typeof FormEntrySchema>;

export function FormQuestionsForm({
  goNextStep,
  data,
  formList,
  refetch,
}: {
  goNextStep: () => void;
  data?: FormEntryValues;
  formList?: FormEntryValues[];
  refetch: () => Promise<any>;
}) {
  const form = useForm<FormEntryValues>({
    resolver: zodResolver(FormEntrySchema),
    defaultValues: data,
    mode: "onChange",
  });

  const { fields: questions } = useFieldArray({
    name: `template.questions`,
    control: form.control,
  });

  //need user role
  const { data: session } = useSession();
  if (!session) return null;

  // mutation
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addAnswer,
    onSuccess: () => {},
  });
  const params = useParams();
  const router = useRouter();

  async function onSubmit(data: FormEntryValues) {
    const submissionData = JSON.parse(JSON.stringify(data));

    submissionData.template.questions.forEach((question: any) => {
      if (question.type === "LIST") {
        const answers = question.answers;
        if (answers.length > 0 && answers[answers.length - 1].answer === "") {
          // Remove the last empty answer
          answers.pop();
        }
      }
    });
    await submissionData.template.questions.forEach(async (question: any) => {
      let questionId = question.id;
      question.answers.forEach(async (answer: any) => {
        // Return a function that when called will execute mutateAsync.
        await addMutation.mutateAsync({
          formId: data.id,
          questionId,
          id: answer.id,
          answer: answer.answer,
          rating: answer.rating,
          userEmail: answer.user!.email,
        });
      });
    });
    if (Number.parseInt(data.currentPhase.split("PHASE")[1]) < 7) {
      await updateFormPhase(
        data.id,
        "PHASE" + (Number.parseInt(data.currentPhase.split("PHASE")[1]) + 1)
      );
      await queryClient.invalidateQueries({ queryKey: ["forms", params?.id] });
      await refetch();
      goNextStep();
    } else {
      await queryClient.invalidateQueries({ queryKey: ["forms", params?.id] });
      router.push("/internships");
    }
  }
  console.log("rendered form");

  if (!data)
    return (
      <>
        {formList?.map((form) => (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{form.template.title}</AccordionTrigger>
              <AccordionContent>
                {form.template.questions.map((question) => {
                  return (
                    <>
                      <p className="text-lg">{question.question}</p>
                      {question.answers.map((answer) => {
                        return (
                          <p className="mb-2">
                            {answer.user?.name} ({answer.user?.role}):{" "}
                            {answer.answer || answer.rating}
                          </p>
                        );
                      })}
                    </>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </>
    );
  // if (isLoading) return <p>Loading...</p>;
  const currentPhase = data.currentPhase;
  const title = data.template.title;
  const t = useTranslation();
  return (
    <>
      {formList?.map((form) => (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{form.template.title}</AccordionTrigger>
            <AccordionContent>
              {form.template.questions.map((question) => {
                return (
                  <>
                    <p className="text-lg">{question.question}</p>
                    {question.answers.map((answer) => {
                      return (
                        <p className="mb-2">
                          {answer.user?.name} ({answer.user?.role}):{" "}
                          {answer.answer || answer.rating}
                        </p>
                      );
                    })}
                  </>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            key={"template.title." + data.template.title}
            control={form.control}
            name="template.title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">{field.value}</FormLabel>
              </FormItem>
            )}
          />
          <div>
            {questions.map((question, questionIndex) =>
              question.type === "RATING" ? (
                <>
                  <FormField
                    control={form.control}
                    key={"ratingquestion" + question.id}
                    name={`template.questions.${questionIndex}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{field.value}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Separator className="p-2" />
                  <RatingAnswers
                    questionIndex={questionIndex}
                    control={form.control}
                  />
                  <Separator className="p-2" />
                </>
              ) : question.type === "BOX" || question.type === "REFLECTION" ? (
                <>
                  <FormField
                    control={form.control}
                    key={"openquestion" + question.id}
                    name={`template.questions.${questionIndex}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{field.value}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Separator className="p-2" />
                  <OpenQuestionAnswers
                    questionIndex={questionIndex}
                    control={form.control}
                  />
                  <Separator className="p-2" />
                </>
              ) : question.type === "LIST" ? (
                <>
                  <FormField
                    control={form.control}
                    key={"bullets-question" + question.id}
                    name={`template.questions.${questionIndex}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">{field.value}</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Separator className="p-2" />
                  {/* <OpenQuestionAnswers
                      questionIndex={questionIndex}
                      control={form.control}
                    /> */}
                  <BulletsQuestionAnswers
                    questionIndex={questionIndex}
                    control={form.control}
                  />
                  <Separator className="p-2" />
                </>
              ) : (
                <></>
              )
            )}
          </div>
          <Button type="submit">{t("submit")}</Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
}
