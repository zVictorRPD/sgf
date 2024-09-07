import { Box } from "@gluestack-ui/themed";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { config } from "../../config/gluestack-ui.config";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";


export function Routes() {
    const theme = DefaultTheme;
    theme.colors.background = config.tokens.colors.white;

    return (
        <Box flex={1} bg="$white">
            <NavigationContainer
                theme={theme}
            >
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    );
}