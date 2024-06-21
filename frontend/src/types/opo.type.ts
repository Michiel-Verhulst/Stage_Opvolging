import {TForm} from "@/types/form.type";

export type TOpo = {
    code: string;
    name: string;
    studyCode: string;
    loops: number;
    templates?: TForm[];
};
