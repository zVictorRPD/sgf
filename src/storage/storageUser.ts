import AsyncStorage from "@react-native-async-storage/async-storage";

import { IUser } from "@utils/interfaces/user";
import { USER_STORAGE_KEY } from "./storageConstants";

export async function storageUserSave(user: IUser) {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER_STORAGE_KEY);
    const user: IUser = storage ? JSON.parse(storage) : ({} as IUser);
    return user;
}
