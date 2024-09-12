import { ScrollView, VStack } from "@gluestack-ui/themed";

interface IAppContainerProps {
    children: React.ReactNode;
}

export function AppContainer({ children }: IAppContainerProps) {
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator
        >
            <VStack
                p={"$6"}
            >
                {children}
            </VStack>
        </ScrollView>
    );
}