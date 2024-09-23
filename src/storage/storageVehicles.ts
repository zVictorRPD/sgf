import AsyncStorage from "@react-native-async-storage/async-storage";
import { VEHICLES_STORAGE_KEY } from "./storageConstants";
import { IVehicle } from "@utils/interfaces/vehicle";


export async function storageVehiclesSave(vehicles: IVehicle[]) {
    await AsyncStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(vehicles));
}

export async function storageVehiclesGet() {
    const storage = await AsyncStorage.getItem(VEHICLES_STORAGE_KEY);
    const vehicles: IVehicle[] = storage ? JSON.parse(storage) : ([] as IVehicle[]);
    return vehicles;
}
