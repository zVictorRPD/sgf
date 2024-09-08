import { VStack } from "@gluestack-ui/themed";

interface IAppContainerProps {
    children: React.ReactNode;
}

export function AppContainer({ children }: IAppContainerProps) {
    return (
        <VStack
            p={"$6"}
        >
            {children}
        </VStack>
    );
}