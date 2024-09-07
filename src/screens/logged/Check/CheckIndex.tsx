import { Center, Text, VStack } from '@gluestack-ui/themed';
import { CheckIn } from './CheckIn';

export function CheckIndex() {
    return (
        <VStack flex={1}>
            <CheckIn />
        </VStack>
    );
}