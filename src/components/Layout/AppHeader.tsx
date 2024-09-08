import { HStack, VStack, Heading, Icon } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { LogOutIcon } from "lucide-react-native";
import { TouchableWithoutFeedback } from "react-native";

interface IAppHeaderProps {
    title: string;
}

export function AppHeader({ title }: IAppHeaderProps) {
    const { signOutUser } = useAuth();
    return (
        <VStack
            bg="$blue600"
            pt={"$12"}
            px={"$6"}
            pb={"$4"}
        >
            <HStack justifyContent='space-between' alignItems='center'>
                <Heading
                    size='lg'
                    numberOfLines={1}
                    color="$white"
                >
                    {title}
                </Heading>
                <TouchableWithoutFeedback 
                    onPress={signOutUser}
                >
                    <Icon
                        as={LogOutIcon}
                        size={"xl"}
                        color="$white"
                        flexShrink={0}

                    />
                </TouchableWithoutFeedback>
            </HStack>
        </VStack>
    )
}