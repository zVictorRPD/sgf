import { VStack } from '@gluestack-ui/themed';
import { CheckIn } from './CheckIn';
import { useAuth } from '@hooks/useAuth';
import { CheckOut } from './CheckOut';

export function CheckIndex() {
    const { user } = useAuth();
    return (
        <VStack flex={1}>
            {!user.checkedIn ? (<CheckIn />) : (<CheckOut />)}
        </VStack>
    );
}