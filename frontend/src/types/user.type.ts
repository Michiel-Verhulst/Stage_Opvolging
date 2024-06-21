import { TRole } from "@/types/role.type";

export type TUser = {
  nummer: string; //rnummer
  name: string; // Felix
  email: string;
  password: string;
  role: TRole;
  accessToken: string;
};
