import { api } from "@services/api";

export async function getDriverByCpf(cpf: string, companyId: string = "", userId: string = "") {
    let requestHeaders = {};

    if (companyId !== '' && userId !== '') {
        requestHeaders = {
            headers: {
                "user-id": userId,
                "company-id": companyId,
            },
        }
    }
    try {
        const response = await api.get(`/driver/cpf?cpf=${cpf}`, requestHeaders);

        if (response.data.responseHeader.responseStatus == "ERROR") {
            throw new Error(response.data.responseHeader.message);
        }
        const data = JSON.parse(response.data.data);

        return data;
    } catch (error: any) {
        throw new Error("Ocorreu um erro interno, tente novamente mais tarde");
    }
}