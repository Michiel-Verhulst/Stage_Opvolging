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
import { addQuestion, createForms } from "@/lib/formService";
import opoService from "@/lib/opoService";
import { TFormRequest } from "@/types/form.type";
import { FormTemplateType } from "@/types/formTemplateType";
import { TOpo } from "@/types/opo.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CreateForm() {
  const [opos, setOpos] = useState<TOpo[]>([]);
  const [questions, setQuestions] = useState([
    { question: "", type: "RATING", description: "" },
  ]);
  const [formData, setFormData] = useState<TFormRequest>({
    title: "",
    opoCode: "",
    type: "EVALUATION",
  });

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await opoService.getOpos();
        setOpos(data);
      } catch (error) {
        console.error("Error fetching OPOs:", error);
      }
    };

    fetchData();
  }, []);

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { question: "", description: "", type: "OPENQUESTION" },
    ]);
  };

  const handleTypeChange = (index: number, selectedType: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      type: selectedType,
    };
    setQuestions(updatedQuestions);
  };

  const handleTextChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], question: text };
    setQuestions(updatedQuestions);
  };

  const handleQuestionDelete = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleDescriptionChange = (index: number, description: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      description: description,
    };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    try {
      const code = opos.find((opo) => opo.name === formData.opoCode)?.code;

      const result = await createForms(formData, code ?? "");

      for (const question of questions) {
        await addQuestion(result.id, question);
        console.log(question);
      }

      router.push("/forms");

      toast({
        title: "Form successfully created.",
        description: "The action was completed without any issues.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred while creating the form. Please try again.",
      });
    }
  };
  const t = useTranslation();
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <div className="mt-6 w-full max-w-full flex-none px-3">
        <div className="shadow-soft-xl relative mb-6 flex min-w-0 flex-col break-words rounded-2xl border-0 bg-card bg-clip-border p-10">
          <div className="flex items-center justify-between space-y-2">
            <div className="max-w-xxl grid w-full items-center gap-1.5">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Create form
              </h2>
              <Label htmlFor="title">{t("title")}</Label>
              <Input
                type="title"
                id="title"
                placeholder={t("title")}
                onChange={({ target }) =>
                  setFormData({ ...formData, title: target.value })
                }
              />
              <Label htmlFor="opo">{t("OPO")}</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, opoCode: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("geen")} />
                </SelectTrigger>
                <SelectContent>
                  {opos.map((opo: any) => (
                    <SelectItem key={opo.id} value={opo.name}>
                      {opo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="type">{t("form_type")}</Label>
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
                    key={index}
                    className="mt-3 flex items-end gap-4 border-t-2 pt-3"
                  >
                    <div>
                      <Label htmlFor={`type${index}`}>{t("type")}</Label>
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
                      <Label htmlFor={`question${index}`}>
                        {t("question")}
                      </Label>
                      <Input
                        type={`question${index}`}
                        onChange={(e) =>
                          handleTextChange(index, e.target.value)
                        }
                        id={`question${index}`}
                        placeholder={t("question")}
                      />
                    </div>
                    <Button
                      variant={"default"}
                      onClick={() => handleQuestionDelete(index)}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                  <div className="w-full">
                    <Label htmlFor={`description${index}`}>
                      {t("description")}
                    </Label>
                    <Input
                      type={`description${index}`}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      id={`description${index}`}
                      placeholder={t("description")}
                    />
                  </div>
                </>
              ))}
              <Button
                className="text-secondary-foreground"
                variant={"secondary"}
                onClick={addQuestionField}
              >
                +
              </Button>
              <Button variant={"default"} onClick={handleSubmit}>
                {t("submit")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;
