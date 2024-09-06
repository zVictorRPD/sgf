/* eslint-disable camelcase */
import { Text, View, StatusBar } from 'react-native'
import {
    useFonts,
    Roboto_700Bold,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto'
import { Center, GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from "./config/gluestack-ui.config"
import { Loading } from '@components/Loading'
import { SignIn } from '@screens/SignIn'
import { RecoverPassword } from '@screens/RecoverPassword'

export default function App() {
    const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

    return (
        <GluestackUIProvider
            config={config}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            {fontsLoaded ? (
                // <SignIn />
                <RecoverPassword />
            ) : (
                <Loading />
            )
            }
        </GluestackUIProvider>
    )
}