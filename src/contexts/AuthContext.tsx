import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { IUser } from "@utils/interfaces/user";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContext {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isLoadingUserData: boolean;
    signInUser: (user: IUser) => Promise<void>;
    signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [token, setToken] = useState<string>("");

    async function signInUser(user: IUser) {
        setUser(user);
        await storageUserSave(user);
    }

    async function signOutUser() {
        setUser({} as IUser);
        await storageUserSave({} as IUser);
    }

    async function loadUserData() {
        setIsLoadingUserData(true);
        try {
            const userData = await storageUserGet();
            if (userData.userId) {
                setUser(userData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingUserData(false);
        }
    }

    useEffect(() => {
        loadUserData();
    }, []);

    
    const authContextValues = {
        user,
        setUser,
        isLoadingUserData,
        signInUser,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={authContextValues}>
            {children}
        </AuthContext.Provider>
    );
}