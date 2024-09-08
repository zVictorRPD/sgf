import { AppContainer } from '@components/Layout/AppContainer';
import { AppHeader } from '@components/Layout/AppHeader';
import { Box, Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { useAuth } from '@hooks/useAuth';
import { Building2Icon, User2Icon, UserRoundCogIcon } from 'lucide-react-native';



export function Dashboard() {
    const { user } = useAuth();

    return (
        <VStack flex={1}>
            <AppHeader title="Dashboard" />
            <AppContainer>
                <Heading
                    size="lg"
                    color="$gray900"
                    pb={"$2"}
                    mb={"$4"}
                    textAlign='center'
                >
                    Dados Gerais
                </Heading>
                <HStack gap={"$3"} px="$2" alignItems='center'>
                    <Icon flexShrink={0} as={User2Icon} size={"lg"} color="$blue600" />
                    <Box flex={1}>
                        <Text fontSize={"$lg"}>{user.name}</Text>
                    </Box>
                </HStack>
                <Box borderBottomColor='$blueGray300' borderBottomWidth={1} my={"$4"} />
                {user?.profile?.description && (
                    <>
                        <HStack gap={"$3"} px="$2" alignItems='center'>
                            <Icon flexShrink={0} as={UserRoundCogIcon} size={"lg"} color="$blue600" />
                            <Box flex={1}>
                                <Text fontSize={"$lg"}>{user.profile.description}</Text>
                            </Box>
                        </HStack>
                        <Box borderBottomColor='$blueGray300' borderBottomWidth={1} my={"$4"} />
                    </>
                )}
                <HStack gap={"$3"} px="$2" alignItems='center'>
                    <Icon flexShrink={0} as={Building2Icon} size={"lg"} color="$blue600" />
                    <Box flex={1}>
                        <Text fontSize={"$lg"}>
                            {user?.company?.fantasyName || ""}
                        </Text>
                    </Box>
                </HStack>
                <Box borderBottomColor='$blueGray300' borderBottomWidth={1} my={"$4"} />
                <Heading
                    size="lg"
                    color="$gray900"
                    pb={"$2"}
                    mb={"$4"}
                    textAlign='center'
                >
                    Dados Sobre o Veículo
                </Heading>
            </AppContainer>
        </VStack>
    );
}