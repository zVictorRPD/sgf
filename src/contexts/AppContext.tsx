import { ToastMessage } from "@components/ToastMessage";
import { useToast } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { IVehicle } from "@utils/interfaces/vehicle";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface IAppContext {
    vehicles: IVehicle[];
    setVehicles: React.Dispatch<React.SetStateAction<IVehicle[]>>;
    isLoadingVehicles: boolean;
    loadVehicles: (baseId: string) => Promise<void>;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export function AppProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [isLoadingVehicles, setIsLoadingVehicles] = useState(false);

    async function loadVehicles(baseId: string) {
        setIsLoadingVehicles(true);
        try {
            const response = await api.get(`/vehicle/list/available/operational-base/id?operationalBaseId=${baseId}`);
            if (!response.data) throw new Error();

            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);
            setVehicles(data);
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="success"
                    title="Veículos carregados com sucesso"
                    onClose={() => toast.close(id)}
                />)
            });

        } catch (error: any) {
            toast.show({
                placement: 'top',
                render: ({ id }) => (<ToastMessage
                    id={id}
                    action="error"
                    title="Erro ao buscar veículos"
                    description={error?.message || "Ocorreu um erro interno, tente novamente mais tarde"}
                    onClose={() => toast.close(id)}
                />)
            });
        } finally {
            setIsLoadingVehicles(false);
        }
    }

    const appContextValues = {
        vehicles,
        setVehicles,
        isLoadingVehicles,
        loadVehicles,
    };

    return (
        <AppContext.Provider value={appContextValues}>
            {children}
        </AppContext.Provider>
    );
}