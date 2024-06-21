"use client";
import { useTranslation } from "@/components/language-toggle/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { EditForms, addQuestion, getFormById } from "@/lib/formService";
import questionService from "@/lib/questionService";
import { TForm, TFormRequest } from "@/types/form.type";
import { FormTemplateType } from "@/types/formTemplateType";
import { TQuestion } from "@/types/question.type";
import { QuestionType } from "@/types/questionType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFormById = ({ params }: any) => {
  const [form, setForm] = useState<TForm>();
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [formData, setFormData] = useState<TFormRequest>({
    title: "",
    opoCode: "",
    type: "EVALUATION",
  });

  const { toast } = useToast();
  const router = useRouter();

  const getForm = async () => {
    try {
      const formResponse = await getFormById(params.id);
      const formee = await formResponse.json();

      setForm(formee);
      setFormData({
        title: formee.title || "",
        opoCode: formee.opo || "",
        type: formee.type || "",
      });

      setQuestions(formee.questions || []);
    } catch (error) {
      console.error("Error fetching form by ID", error);
    }
  };

  const addQuestionField = () => {
    const newQuestion: TQuestion = {
      id: questions.length + 1,
      question: "",
      type: "BOX",
      description: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionTextChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = text;
    setQuestions(updatedQuestions);
  };

  const handleQuestionDelete = async (index: number, questionId: number) => {
    await questionService.deleteQuestion(params.id, questionId);
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index: number, selectedType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = selectedType as QuestionType;
    setQuestions(updatedQuestions);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleQuestionDescriptionChange = (
    index: number,
    description: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].description = description;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    console.log("Form data submitted:", { ...formData, questions });
    console.log(EditForms(formData, params.id));

    for (const question of questions) {
      await addQuestion(params.id, question);
      console.log(question);
    }
    router.push("/forms");
  };

  useEffect(() => {
    if (params.id) {
      getForm();
    }
  }, [params.id]);
  const t = useTranslation();
  return (
    <>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mt-6 w-full max-w-full flex-none px-3">
          <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
            <div className="flex items-center justify-between space-y-2">
              <div className="max-w-xxl grid w-full items-center gap-1.5">
                <h2 className="mb-4 text-4xl font-bold tracking-tight">
                  Edit form
                </h2>
                <Label htmlFor="title" className="text-lg">
                  Title
                </Label>
                <Input
                  type="title"
                  id="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                />
                <Label htmlFor="type" className="text-lg">
                  Form type
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      type: value as FormTemplateType,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={formData.type} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="EVALUATION" value="EVALUATION">
                      {t("evaluation")}
                    </SelectItem>
                    <SelectItem key="REFLECTION" value="REFLECTION">
                      {t("reflection")}
                    </SelectItem>
                    <SelectItem key="CONCLUSION" value="CONCLUSION">
                      {t("conclusion")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {questions.map((question, index) => (
                  <>
                    <div
                      key={question.id}
                      className="mt-3 flex items-end gap-4 border-t-2 pt-3"
                    >
                      <div>
                        <Label
                          htmlFor={`type${question.id}`}
                          className="text-lg"
                        >
                          Type
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleTypeChange(index, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={question.type} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key="RATING" value="RATING">
                              {t("rating")}
                            </SelectItem>
                            <SelectItem key="BOX" value="BOX">
                              {t("box")}
                            </SelectItem>
                            <SelectItem key="LIST" value="LIST">
                              {t("list")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-full">
                        <Label
                          htmlFor={`question${question.id}`}
                          className="text-lg"
                        >
                          Question
                        </Label>
                        <Input
                          type={`question${question.id}`}
                          id={`question${question.id}`}
                          placeholder={question.question}
                          value={question.question}
                          onChange={(e) =>
                            handleQuestionTextChange(index, e.target.value)
                          }
                          className="w-full rounded-md border px-3 py-2"
                        />
                      </div>
                      <Button
                        variant={"default"}
                        onClick={() =>
                          handleQuestionDelete(index, question.id as number)
                        }
                      >
                        {t("delete")}
                      </Button>
                    </div>
                    <div>
                      <Label
                        htmlFor={`description${question.id}`}
                        className="text-lg"
                      >
                        Description
                      </Label>
                      <Input
                        type={`description${question.id}`}
                        id={`description${question.id}`}
                        placeholder="Description"
                        value={question.description}
                        onChange={(e) =>
                          handleQuestionDescriptionChange(index, e.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2"
                      />
                    </div>{" "}
                  </>
                ))}
                <Button
                  className="text-secondary-foreground"
                  variant={"secondary"}
                  onClick={addQuestionField}
                >
                  +
                </Button>
                <Button
                  variant={"default"}
                  onClick={() => {
                    handleSubmit();
                    toast({
                      title: "Form edited succesfully.",
                      description:
                        "The action was completed without any issues.",
                    });
                  }}
                >
                  {t("submit")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFormById;
