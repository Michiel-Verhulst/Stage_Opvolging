import { FormTemplateType } from "./formTemplateType"
import { TOpo } from "./opo.type"
import { TQuestion } from "./question.type"

export interface TForm{
    id?: number
    title: string
    // study: string
    questions?: TQuestion[]
    type: FormTemplateType
    opoCode: TOpo
}

export interface TFormRequest{
    id?: number
    title: string
    // study: string
    questions?: TQuestion[]
    type: FormTemplateType
    opoCode: string
}