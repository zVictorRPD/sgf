import { api } from "@services/api";
import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { IUser } from "@utils/interfaces/user";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContext {
    user: IUser;
    updateUser: (user: IUser) => Promise<void>;
    isLoadingUserData: boolean;
    signInUser: (user: IUser) => Promise<void>;
    signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);

    async function signInUser(user: IUser) {
        setUser(user);
        await storageUserSave(user);
        //setApi headers
        api.defaults.headers["user-id"] = user.userId;
        api.defaults.headers["company-id"] = user.company.companyId;
    }

    async function signOutUser() {
        setUser({} as IUser);
        await storageUserSave({} as IUser);
        //setApi headers
        api.defaults.headers["user-id"] = "";
        api.defaults.headers["company-id"] = "";
    }

    async function updateUser(user: IUser) {
        setUser(user);
        await storageUserSave(user);
    }

    async function loadUserData() {
        setIsLoadingUserData(true);
        try {
            const userData = await storageUserGet();
            if (userData.userId) {
                setUser(userData);
                //setApi headers
                api.defaults.headers["user-id"] = userData.userId;
                api.defaults.headers["company-id"] = userData.company.companyId;
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
        updateUser,
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