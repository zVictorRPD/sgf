import { Loading } from "@components/Loading";
import { ToastMessage } from "@components/ToastMessage";
import { useToast } from "@gluestack-ui/themed";
import { api } from "@services/api";
import { storageVehiclesGet, storageVehiclesSave } from "@storage/storageVehicles";
import { IVehicle } from "@utils/interfaces/vehicle";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface IAppContext {
    vehicles: IVehicle[];
    updateVehicles: (vehicles: IVehicle[]) => Promise<void>;
    isLoadingVehicles: boolean;
    isLoadingVehiclesFromStorage: boolean;
    loadVehicles: (baseId: string) => Promise<void>;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export function AppProvider({ children }: { children: ReactNode }) {
    const toast = useToast();
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [isLoadingVehicles, setIsLoadingVehicles] = useState(false);
    const [isLoadingVehiclesFromStorage, setIsLoadingVehiclesFromStorage] = useState(true);

    async function loadVehicles(baseId: string) {
        setIsLoadingVehicles(true);
        try {
            const response = await api.get(`/vehicle/list/available/operational-base/id?operationalBaseId=${baseId}`);

            if (response.data.responseHeader.responseStatus == "ERROR") {
                throw new Error(response.data.responseHeader.message);
            }

            const data = JSON.parse(response.data.data);
            setVehicles(data);
            await storageVehiclesSave(data);
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

    async function updateVehicles(vehicles: IVehicle[]) {
        setVehicles(vehicles);
        await storageVehiclesSave(vehicles);
    }

    async function loadVehiclesFromStorage() {
        setIsLoadingVehiclesFromStorage(true);
        try {
            const vehicles = await storageVehiclesGet();
            if (vehicles.length) {
                setVehicles(vehicles);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingVehiclesFromStorage(false);
        }
    }

    const appContextValues = {
        vehicles,
        updateVehicles,
        isLoadingVehicles,
        loadVehicles,
        isLoadingVehiclesFromStorage
    };

    useEffect(() => {
        loadVehiclesFromStorage();
    }, []);

    return (
        <AppContext.Provider value={appContextValues}>
            {children}
        </AppContext.Provider>
    );
}