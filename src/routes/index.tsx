import { Box } from "@gluestack-ui/themed";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { config } from "../../config/gluestack-ui.config";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";


export function Routes() {
    const { user, isLoadingUserData } = useAuth();

    const theme = DefaultTheme;
    theme.colors.background = config.tokens.colors.white;

    if(isLoadingUserData) {
        return <Loading />
    }

    return (
        <Box flex={1} bg="$white">
            <NavigationContainer
                theme={theme}
            >
                {user?.userId ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    );
}