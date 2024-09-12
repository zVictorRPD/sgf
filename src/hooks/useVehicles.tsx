import { useContext } from "react";

import { AppContext } from "@contexts/AppContext";

export function useVehicles() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}