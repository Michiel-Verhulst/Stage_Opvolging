import keys from "@/keys";
import { TOpo } from "@/types/opo.type";
import axios from "axios";

const getOpos = async () => {
    const res = await axios.get(`${keys.NEXT_PUBLIC_URL}/OPO`);
    return res.data as TOpo[];
};

const getOpo = async (opoCode: TOpo['code']) => await axios.get<TOpo>(`${keys.NEXT_PUBLIC_URL}/OPO/getByCode?opoCode=${opoCode}`);

const createOpo = async (opoData: TOpo) => await axios.post<TOpo>(`${keys.NEXT_PUBLIC_URL}/OPO/createOPO`, opoData);
const editOpo = async (opoData: TOpo, opoCode: TOpo['code']) => await axios.put<TOpo>(`${keys.NEXT_PUBLIC_URL}/OPO/edit?opoCode=${opoCode}`, opoData);
const removeOpo = async (opoCode: TOpo['code']) => await axios.delete<TOpo>(`${keys.NEXT_PUBLIC_URL}/OPO/remove?opoCode=${opoCode}`);

const opoService = { getOpos, createOpo, removeOpo, getOpo, editOpo };
export default opoService;
