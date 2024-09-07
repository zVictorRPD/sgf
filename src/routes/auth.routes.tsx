import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RecoverPassword } from "@screens/auth/RecoverPassword";
import { ResetPassword } from "@screens/auth/ResetPassword";
import { SignIn } from "@screens/auth/SignIn";

type TAuthRoutesProps = {
    signIn: undefined;
    recoverPassword: undefined;
    resetPassword: undefined;
}

export type TAuthNavigatorRoutesProps = NativeStackNavigationProp<TAuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<TAuthRoutesProps>();

export function AuthRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="signIn"
                component={SignIn}
            />
            <Screen
                name="recoverPassword"
                component={RecoverPassword}
            />
            <Screen 
                name="resetPassword"
                component={ResetPassword}
            />
        </Navigator>
    );
}