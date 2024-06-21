import { FormEntryValues } from "@/app/feedback-loop/form-questions-form";
import keys from "@/keys";
import axios from "axios";
import { requestHandler } from "./utils/requestHandler";
import { TForm } from "@/types/form.type";

interface GetFormParams {
  internshipId: number;
}

interface AddAnswerParams {
  id?: number;
  answer: string | null;
  rating: number | null;
  questionId: number;
  userEmail: string;
  formId: number;
}
const getFormsByInternshipId = requestHandler<GetFormParams, FormEntryValues[]>(
  (params) =>
    axios.get(
      `${keys.NEXT_PUBLIC_URL}/internships/forms/${params?.internshipId}`
    )
);

const addAnswer = requestHandler<AddAnswerParams, void>((params) =>
  axios.post(
    `${keys.NEXT_PUBLIC_URL}/questions/addAnswer?questionId=${params?.questionId}&userId=${params?.userEmail}&formId=${params?.formId}`,
    {
      id: params?.id,
      answer: params?.answer,
      rating: params?.rating,
    }
  )
);

const updateFormPhase = async (formId: number, phase: string) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/forms/phase/edit?formId=${formId}&phase=${phase}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Include any additional headers if needed
      },
    }
  );
};
const getForms = async () => {
  const res = await axios.get(`${keys.NEXT_PUBLIC_URL}/forms`);
  return res.data as TForm[];
};

const getFormById = (formId: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_URL + `/forms/search?templateId=${formId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteFormById = (formId: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_URL + `/forms/disable?templateId=${formId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const createForms = async (formData: any, opoCode: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/forms/createTemplate?opoCode=${opoCode}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
    console.log(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error creating forms:", error);
  }
};

const addQuestion = async (templateId: number, question: any) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_URL}/questions/create?templateId=${templateId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include any additional headers if needed
      },
      body: JSON.stringify(question),
    }
  );
};
// const getForms = async (): Promise<TForm[]> => {
//     let forms: TForm[] = []
//     forms = (await axios(keys.NEXT_PUBLIC_URL + `/forms`)).data
//     return forms
// }

const getFormsForInternshipByStudentId = async (studentId: number) => {
  return (
    await axios.get(`${keys.NEXT_PUBLIC_URL}/internships/forms/${studentId}`)
  ).data[0];
};

const EditForms = async (formData: any, templateId: number) => {
  const put = await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/forms/edit?templateId=${templateId}`,
    formData
  );
  return put.data as TForm;
};

const disableForm = async (templateId: number) => {
  return await axios.put(
    `${process.env.NEXT_PUBLIC_URL}/forms/disable?templateId=${templateId}`
  );
};

export {
  getForms,
  getFormById,
  deleteFormById,
  createForms,
  addQuestion,
  getFormsForInternshipByStudentId,
  addAnswer,
  getFormsByInternshipId,
  updateFormPhase,
  EditForms,
  disableForm,
};
