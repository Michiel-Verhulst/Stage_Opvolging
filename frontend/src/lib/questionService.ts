import keys from "@/keys";
import { TQuestion } from "@/types/question.type";
import axios from "axios";


const editQuestion = async (templateId: number, questionId: number, question: TQuestion) => {
    const response = await fetch(`${keys.NEXT_PUBLIC_URL}/questions/editQuestion/${templateId}/${questionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question), 
    });
  
    if (!response.ok) {
      throw new Error(`Failed to edit question: ${response.status} ${response.statusText}`);
    }
  
    return response.json();
};

const deleteQuestion = async (templateId: number, questionId: number) => {
  return await axios.delete(`${keys.NEXT_PUBLIC_URL}/questions/delete/${templateId}/${questionId}`);
}
  

const questionService = { editQuestion, deleteQuestion}
export default questionService
