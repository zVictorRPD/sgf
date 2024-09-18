import { api } from "@services/api";

export async function getDriverByCpf(cpf: string) {
    try {
        const response = await api.get(`/driver/cpf?cpf=${cpf}`);
        if (!response.data) throw new Error();

        if (response.data.responseHeader.responseStatus == "ERROR") {
            throw new Error(response.data.responseHeader.message);
        }
        const data = JSON.parse(response.data.data);

        return data;
    } catch (error: any) {
        throw new Error(error?.message || "Ocorreu um erro interno, tente novamente mais tarde");
    }
}