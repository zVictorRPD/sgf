import { Icon } from "@gluestack-ui/themed";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CheckIndex } from "@screens/logged/Check/CheckIndex";
import { Dashboard } from "@screens/logged/Dashboard";
import { Refuel } from "@screens/logged/Refuel";
import { FuelIcon, HomeIcon, ListChecksIcon } from "lucide-react-native";
import { config } from "../../config/gluestack-ui.config";

type TAppRoutesProps = {
    dashboard: undefined;
    checkIndex: undefined;
    refuel: undefined;
}

export type TAppNavigatorRoutesProps = BottomTabNavigationProp<TAppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<TAppRoutesProps>();

export function AppRoutes() {

    const { tokens } = config;
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: tokens.colors.blue500,
                tabBarInactiveTintColor: tokens.colors.trueGray500,
                tabBarStyle: {
                    backgroundColor: tokens.colors.white,
                    borderColor: tokens.colors.trueGray300,
                }
            }}
        >
            <Screen
                name="dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon as={HomeIcon} size="xl" color={color} />
                    )
                }}
            />
            <Screen
                name="checkIndex"
                component={CheckIndex}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon as={ListChecksIcon} size="xl" color={color} />
                    )
                }}
            />
            <Screen
                name="refuel"
                component={Refuel}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon as={FuelIcon} size="xl" color={color} />
                    )
                }}
            />
        </Navigator>
    )
}