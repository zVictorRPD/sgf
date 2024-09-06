import { Center, Spinner } from '@gluestack-ui/themed'

export function Loading() {
    return (
        <Center flex={1} bg="$white">
            <Spinner size={60} color="$blue500" />
        </Center>
    )
}